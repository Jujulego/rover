import React, { FC } from 'react';

import DStarRover from 'data/rovers/DStarRover';
import { MOVES } from 'data/Direction';
import Coords, { equal, surrounding2 } from 'data/Coords';

import { p2m } from '../constants';

// Types
type Props = {
  rover: DStarRover
}

// Utils
function _generate(rover: DStarRover, node: Coords, path: string): string {
  path += ` L ${p2m(node.x)} ${p2m(node.y)}`;

  MOVES.forEach((dir, i) => {
    const n = surrounding2(node, dir);
    const d = rover.getDStarData(n);

    if (d && d.from && equal(node, d.from)) {
      path = _generate(rover, n, path);
      path += ` M ${p2m(node.x)} ${p2m(node.y)}`;
    }
  });

  return path;
}

function generate(rover: DStarRover): string {
  return _generate(rover, rover.target, `M ${p2m(rover.target.x)} ${p2m(rover.target.y)}`)
}

// Components
const DStarTree: FC<Props> = (props) => {
  const { rover } = props;

  // Rendering
  return (
    <path d={generate(rover)} fill="transparent" stroke="#FFEB3B" strokeWidth={2} />
  )
};

export default DStarTree;
