import React, { FC } from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';

import { DEFAULT_HEIGHT } from 'data/constants';
import { Coords, equal, hash } from 'data/Coords';
import { Map } from 'data/Map';
import CachedRover from 'data/rovers/CachedRover';
import DStarRover from 'data/rovers/DStarRover';

import { RoverState } from 'store/rovers/types';

import Floor from './Floor';

import targetImg from 'assets/target.png';
import styles from './Case.module.scss';

// Types
type Props = {
  map: Map,
  pos: Coords,
  slope?: number,
  debug?: RoverState,

  isTarget?: boolean,
  showCoords?: boolean,
  showHeight?: boolean,

  className?: string,
  style?: { [name: string]: any },

  onClick?: (_: Coords) => void
};

// Utils
const computeLine = (from: Coords, to: Coords) => ({
  x1: 96, y1: 96,
  x2: 96 * (1 + to.x - from.x),
  y2: 96 * (1 + to.y - from.y)
});

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

  const ia = debug && debug.data;
  const cached = ia instanceof CachedRover ? ia.getCachedCase(pos) : null;
  const dstar = ia instanceof DStarRover ? ia.getDStarData(pos) : null;

  const prev = new Array<Coords>();
  if (debug) {
    if (debug.track.length > 0) {
      const last = debug.track[debug.track.length - 1];
      if (ia && equal(pos, last)) {
        prev.push(ia.pos);
      }
    }

    for (let i = 1; i < debug.track.length; ++i) {
      if (equal(pos, debug.track[i-1])) {
        prev.push(debug.track[i]);
      }
    }
  }

  return (
    <div className={clsx(styles.case, className)} style={style} onClick={handleClick}>
      <Floor
        type={data ? data.floor : 'hole'} borders={map.borders(pos)}
        unknown={cached && cached.floor === undefined}
      />
      { isTarget && (
        <img className={styles.target} src={targetImg} alt="target" />
      ) }
      { debug && (
        <svg className={styles.svg} height={200} width={200}>
          { prev.map((p) => (
            <line key={hash(p)} className={styles.track} {...computeLine(pos, p)} />
          )) }
          { (dstar && dstar.from && !dstar.obstacle) && (
            <line className={styles.dstar} {...computeLine(pos, dstar.from)} />
          ) }
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
