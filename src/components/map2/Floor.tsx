import React, { FC } from 'react';
import clsx from 'clsx';

import themes from 'assets/themes/themes';

import Direction, { DAngle, DBorder, DStrait, isBorder } from 'data/Direction';
import { Borders2, Cliffs, BorderType, FloorType } from 'data/Map';

import styles from './Floor.module.scss';

// Types
type Props = {
  type: FloorType,
  borders?: Borders2,
  cliffs?: Cliffs,

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
function getBorder(borders: Borders2, [d1, d2]: Array<DStrait>): [DBorder | undefined, BorderType] {
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
    dir = dir | da;

    if (type === 'hole') {
      type = borders[da] as BorderType;
    }
  }

  return [isBorder(dir) ? dir : undefined, type];
}

function getCliff(cliffs: Cliffs, [d1, d2]: Array<DStrait>): DBorder | undefined {
  let dir = Direction.N;

  if (d1 && cliffs[d1]) {
    dir = dir | d1;
  }

  if (d2 && cliffs[d2]) {
    dir = dir | d2;
  }

  const da: DAngle = d1 ^ d2;
  if (d1 && d2 && !dir && cliffs[da]) {
    dir = dir | da;
  }

  return isBorder(dir) ? dir : undefined;
}

function mapBorders<T>(borders: Borders2, cliffs: Cliffs, cb: (dir: DBorder | undefined, cliff: DBorder | undefined, type: BorderType, i: number) => T): Array<T> {
  return BORDERS.map((dirs, index) => {
    const [d, t] = getBorder(borders, dirs);
    return cb(d, getCliff(cliffs, dirs), t, index);
  });
}

// Component
const Floor: FC<Props> = (props) => {
  const {
    type, borders = {}, cliffs = {},
    className, style
  } = props;

  // Rendering
  return (
    <div className={clsx(styles.floor, className)} style={style}>
      { mapBorders(borders, cliffs, (dir, cliff, t, i) =>
        <div key={i}>
          { (dir && t === 'hole') && (
            <img src={themes.hole.getImage(dir)} alt="hole" />
          ) }
          { !(dir && type === 'hole') && (
            <img src={themes[type].getImage(dir)} alt={type} id={dir && dir.toString()} />
          ) }
          { cliff && (
            <img src={themes[type].getImage(cliff)} alt={type} />
          ) }
        </div>
      ) }
    </div>
  );
};

export default Floor;
