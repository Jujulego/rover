import React, { FC, MouseEventHandler, memo } from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';

import targetImg from 'assets/themes/target.png';

import { round2 } from 'utils';

import Coords, { equal } from 'data/Coords';
import Map from 'data/Map';

import { CASE_SIZE } from './constants';
import Floor from './Floor';
import styles from './Case.module.scss';

// Props
type Props = {
  pos: Coords, map: Map, target?: boolean,
  coords?: boolean, height?: boolean, unknown?: boolean, cost?: number,
  onClick?: MouseEventHandler<HTMLDivElement>
}

// Component
const Case : FC<Props> = (props) => {
  const {
    pos, map, target,
    coords, height, unknown, cost,
    onClick
  } = props;
  const data = map.get(pos);

  // Rendering
  if (!data) return null;

  return (
    <div
      className={clsx(styles.case, { [styles.unknown]: unknown })}
      style={{ top: pos.y * CASE_SIZE, left: pos.x * CASE_SIZE }}

      onClick={onClick}
    >
      <Floor type={data.floor} borders={map.borders(pos)} cliffs={map.cliffs(pos)} />
      { (coords || height || (cost !== undefined)) && (
        <div className={styles.data}>
          { coords && <Typography classes={{ root: styles.tl }} variant="body2">({pos.x},{pos.y})</Typography> }
          { height && <Typography classes={{ root: styles.bl }} variant="body2">{data.height}</Typography> }
          { (cost !== undefined) && <Typography classes={{ root: styles.tr }} variant="body2">{isFinite(cost) ? round2(cost) : '\u221E'}</Typography> }
        </div>
      ) }
      { target && (
        <img className={styles.target} src={targetImg} alt="target" />
      )}
    </div>
  )
};

function areEquals(pp: Props, np: Props): boolean {
  return equal(pp.pos, np.pos)
    && pp.map === np.map
    && pp.target === np.target
    && pp.coords === np.coords
    && pp.height === np.height
    && pp.unknown === np.unknown
    && pp.cost === np.cost
    && pp.onClick === np.onClick;
}

export default memo(Case, areEquals);
