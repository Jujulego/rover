import React, { FC } from 'react';
import clsx from 'clsx';

import themes from 'assets/themes/themes';

import Direction, { DAngle, DBorder, DStrait, isBorder } from 'data/Direction';
import { Borders2, BorderType, FloorType } from 'data/Map';

import styles from './Floor.module.scss';

// Types
type Props = {
  type: FloorType,
  borders?: Borders2,

  className?: string,
  style?: { [name: string]: any }
}

// Constants
const BORDERS: Array<Array<DStrait>> = [
  [Direction.T, Direction.L],
  [Direction.T],
  [Direction.T, Direction.R],
  [Direction.L],
  [],
  [Direction.R],
  [Direction.B, Direction.L],
  [Direction.B],
  [Direction.B, Direction.R]
];

// Utils
function getDir(borders: Borders2, [d1, d2]: Array<DStrait>): [DBorder | undefined, BorderType] {
  let dir = Direction.N;
  let type: BorderType = 'hole';

  if (d1 && borders[d1]) {
    dir = dir | d1;
    type = borders[d1] as BorderType;
  }

  if (d2 && borders[d2]) {
    dir = dir | d2;

    if (type === 'hole') {
      type = borders[d2] as BorderType;
    }
  }

  const da: DAngle = d1 ^ d2;
  if (d1 && d2 && !dir && borders[da]) {
    dir = dir | (d1 ^ d2);

    if (type === 'hole') {
      type = borders[da] as BorderType;
    }
  }

  return [isBorder(dir) ? dir : undefined, type];
}

function mapDirs<T>(borders: Borders2, cb: (dir: DBorder | undefined, type: BorderType, i: number) => T): Array<T> {
  return BORDERS.map((dirs, index) => {
    const [d, t] = getDir(borders, dirs);
    return cb(d, t, index)
  })
}

// Component
const Floor: FC<Props> = (props) => {
  const {
    type, borders = {},
    className, style
  } = props;

  // Rendering
  return (
    <div className={clsx(styles.floor, className)} style={style}>
      { mapDirs(borders, (dir, t, i) =>
        <div key={i}>
          { (dir && t === 'hole') && (
            <img src={themes.hole.getImage(dir)} alt="hole" />
          ) }
          { !(dir && type === 'hole') && (
            <img src={themes[type].getImage(dir)} alt={type} id={dir && dir.toString()} />
          ) }
        </div>
      ) }
    </div>
  );
};

export default Floor;
