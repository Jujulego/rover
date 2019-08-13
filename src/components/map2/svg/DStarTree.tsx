import React, { FC, useMemo } from 'react';

import DStarRover from 'data/rovers/DStarRover';
import { MOVES } from 'data/Direction';
import Coords, { equal, surrounding2 } from 'data/Coords';
import Map from 'data/Map';

import { p2m } from '../constants';

// Types
type Zone = { center: Coords, size: Coords }
type Props = {
  rover: DStarRover,
  map: Map, zone: Zone
}

// Utils
function generate(rover: DStarRover, node: Coords, path: Array<string>, cmd: string, out: (p: Coords) => boolean): Array<string> {
  path.push(`${cmd} ${p2m(node.x)} ${p2m(node.y)}`);

  let first = true;
  MOVES.forEach((dir, i) => {
    const n = surrounding2(node, dir);
    const d = rover.getDStarData(n);

    if (out(n)) return;
    if (d && d.from && !d.obstacle && equal(node, d.from)) {
      if (!first) {
        path.push(`M ${p2m(node.x)} ${p2m(node.y)}`);
      }

      generate(rover, n, path, 'L', out);
      first = false;
    }
  });

  return path;
}

// Components
const DStarTree: FC<Props> = (props) => {
  const { rover, map, zone } = props;

  // Computing
  const path = useMemo(() => {
    const min = {
      x: Math.max(zone.center.x - ((zone.size.x + 1) / 2), 0),
      y: Math.max(zone.center.y - ((zone.size.y + 1) / 2), 0)
    };
    const max = {
      x: Math.min(zone.center.x + ((zone.size.x + 1) / 2), map.size.x - 1),
      y: Math.min(zone.center.y + ((zone.size.y + 1) / 2), map.size.y - 1)
    };

    function out(p: Coords): boolean {
      return (p.x < min.x || p.x > max.x) || (p.y < min.y || p.y > max.y);
    }

    const path: Array<string> = [];

    if (out(rover.target)) {
      for (let x = min.x; x <= max.x; ++x) {
        for (let y = min.y; y <= max.y; ++y) {
          const p = { x, y };
          const d = rover.getDStarData(p);

          if (d && d.from && !d.obstacle && out(d.from)) {
            generate(rover, p, path, 'M', out);
          }
        }
      }
    } else {
      generate(rover, rover.target, path, 'M', out);
    }

    return path.join(' ');
  }, [rover.treeVersion, zone.center, zone.size]);

  // Rendering
  return (
    <path d={path} fill="transparent" stroke="#FFEB3B" strokeWidth={2} />
  )
};

export default DStarTree;
