import React, { FC } from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';

import { Coords } from '../../data/Coords';
import { Map } from '../../data/Map';

import Floor from './Floor';

import styles from './Case.module.scss';

// Types
type Props = {
  map: Map,
  pos: Coords,
  className?: string,
  style?: { [name: string]: any }
};

// Component
const Case: FC<Props> = (props) => {
  const {
    map, pos,
    className, style
  } = props;

  // Rendering
  const data = map.get(pos);

  return (
    <div className={clsx(styles.case, className)} style={style}>
      <Floor type={data ? data.floor : 'hole'} borders={map.borders(pos)} />
      <div className={styles.data}>
        <Typography classes={{ root: styles.coords}}>
          { pos.x } { pos.y }
        </Typography>
      </div>
    </div>
  )
};

export default Case;
