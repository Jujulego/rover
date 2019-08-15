import React, { FC, useMemo } from 'react';

import TreeMixin, { TNode } from 'data/rovers/bases/TreeMixin';
import Coords from 'data/Coords';
import Map from 'data/Map';

import { p2m } from '../constants';

// Types
type Zone = { center: Coords, size: Coords }
type Props = {
  rover: TreeMixin,
  map: Map, zone: Zone
}

// Utils
function generate(rover: TreeMixin, node: TNode, path: Array<string>, cmd: string, out: (p: Coords) => boolean): Array<string> {
  const { pos } = node;
  path.push(`${cmd} ${p2m(pos.x)} ${p2m(pos.y)}`);

  let first = true;
  rover.getChildren(node).forEach(n => {
    if (out(n.pos)) return;
    if (!first) {
      path.push(`M ${p2m(pos.x)} ${p2m(pos.y)}`);
    }

    generate(rover, n, path, 'L', out);
    first = false;
  });

  return path;
}

// Components
const Tree: FC<Props> = (props) => {
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
          const n = rover.getNode(p);

          if (n && !n.obstacle && n.from && out(n.from)) {
            generate(rover, n, path, 'M', out);
          }
        }
      }
    } else {
      const n = rover.getNode(rover.target) as TNode;
      generate(rover, n, path, 'M', out);
    }

    return path.join(' ');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rover.treeVersion(), zone.center, zone.size, map.size.x, map.size.y]);

  // Rendering
  return (
    <path d={path} fill="transparent" stroke="#FFEB3B" strokeWidth={2} />
  )
};

export default Tree;
