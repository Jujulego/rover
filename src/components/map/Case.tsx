import React, { FC } from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';

import { Coords } from 'data/Coords';
import { Map } from 'data/Map';

import Floor from './Floor';

import styles from './Case.module.scss';

// Types
type Props = {
  map: Map,
  pos: Coords,
  showCoords?: boolean,
  className?: string,
  style?: { [name: string]: any },

  onClick?: (_: Coords) => void
};

// Component
const Case: FC<Props> = (props) => {
  const {
    map, pos, showCoords = false,
    className, style,
    onClick
  } = props;

  // Functions
  function handleClick() {
    if (onClick) onClick(pos);
  }

  // Rendering
  const data = map.get(pos);

  return (
    <div className={clsx(styles.case, className)} style={style} onClick={handleClick}>
      <Floor type={data ? data.floor : 'hole'} borders={map.borders(pos)} />
      <div className={styles.data}>
        { showCoords && (
          <Typography classes={{ root: styles.coords}}>
            { pos.x } { pos.y }
          </Typography>
        ) }
      </div>
    </div>
  )
};

export default Case;
