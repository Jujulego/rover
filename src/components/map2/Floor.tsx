import React, { FC } from 'react';

import themes from 'assets/themes/themes';

import Direction, { DAngle, DBorder, DStrait, isBorder } from 'data/Direction';
import { FloorType } from 'data/Map';

import styles from './Floor.module.scss';

// Types
type Borders = { [name in DStrait | DAngle]?: boolean };
type Props = {
  type: FloorType,
  borders?: Borders,
}

// Constants
const BORDERS: Array<Array<DStrait | DAngle>> = [
  [Direction.T, Direction.L, Direction.TLA],
  [Direction.T],
  [Direction.T, Direction.R, Direction.TRA],
  [Direction.L],
  [],
  [Direction.R],
  [Direction.B, Direction.L, Direction.BLA],
  [Direction.B],
  [Direction.B, Direction.R, Direction.BRA]
];

// Utils
function getDir(borders: Borders, dirs: Array<DStrait | DAngle>): DBorder | undefined {
  const dir = dirs.reduce((acc, d) => borders[d] ? acc | d : acc, Direction.N);
  return isBorder(dir) ? dir : undefined;
}

function mapDirs<T>(borders: Borders, cb: (dir: DBorder | undefined, i: number) => T): Array<T> {
  return BORDERS.map((dirs, index) => cb(getDir(borders, dirs), index))
}

// Component
const Floor: FC<Props> = (props) => {
  const { type, borders = {} } = props;

  // Rendering
  return (
    <div className={styles.floor}>
      { mapDirs(borders, (dir, i) =>
        <div key={i}>
          { (dir && type !== 'hole') && (
            <img src={themes.hole.getImage(dir)} />
          ) }
          <img src={themes[type].getImage(dir)} />
        </div>
      ) }
    </div>
  );
};

export default Floor;