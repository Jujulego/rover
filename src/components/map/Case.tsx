import React, { FC } from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';

import { DEFAULT_HEIGHT } from 'data/constants';
import { Coords } from 'data/Coords';
import { Map } from 'data/Map';
import { RoverAI } from 'data/RoverAI';
import CachedRover from 'data/rovers/CachedRover';
import DStarRover from 'data/rovers/DStarRover';

import Floor from './Floor';

import targetImg from 'assets/target.png';
import styles from './Case.module.scss';

// Types
type Props = {
  map: Map,
  pos: Coords,
  slope?: number,
  debug?: RoverAI,

  isTarget?: boolean,
  showCoords?: boolean,
  showHeight?: boolean,

  className?: string,
  style?: { [name: string]: any },

  onClick?: (_: Coords) => void
};

// Component
const Case: FC<Props> = (props) => {
  const {
    map, pos, slope,
    debug,
    isTarget = false,
    showCoords = false,
    showHeight = false,
    className, style,
    onClick
  } = props;

  // Functions
  function handleClick() {
    if (onClick) onClick(pos);
  }

  // Rendering
  const data = map.get(pos);
  const cached = debug instanceof CachedRover ? debug.getCachedCase(pos) : null;
  const dstar = debug instanceof DStarRover ? debug.getDStarData(pos) : null;

  return (
    <div className={clsx(styles.case, className)} style={style} onClick={handleClick}>
      <Floor
        type={data ? data.floor : 'hole'} borders={map.borders(pos)}
        unknown={cached && cached.floor === undefined}
      />
      { isTarget && (
        <img className={styles.target} src={targetImg} alt="target" />
      ) }
      { (dstar && dstar.from && !dstar.obstacle) && (
        <svg className={styles.dstar} height={192} width={192}>
          <line x1={96} y1={96} x2={96 * (1 + dstar.from.x - pos.x)} y2={96 * (1 + dstar.from.y - pos.y)} stroke="#FDD835" width={5} />
        </svg>
      ) }
      <div className={styles.data}>
        { showCoords && (
          <Typography classes={{ root: styles.coords }}>({ pos.x },{ pos.y })</Typography>
        ) }
        { dstar && (
          <Typography classes={{ root: styles.cost }}>{ (dstar.obstacle || dstar.from == null) ? '\u221E' : Math.round(dstar.cost * 100) / 100 }</Typography>
        ) }
        { (showHeight) && (
          <Typography classes={{ root: styles.height }}>{ data ? data.height : <em>{ DEFAULT_HEIGHT }</em> }</Typography>
        ) }
        { (slope !== undefined) && (
          <Typography classes={{ root: styles.slope }}>{ Math.round(slope * 100) }%</Typography>
        ) }
      </div>
    </div>
  )
};

export default Case;
