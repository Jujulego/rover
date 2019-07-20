import React, { FC } from 'react';
import classNames from 'classnames';

import { Typography } from '@material-ui/core';

import { Coords } from '../../data/coords';

import Floor from './Floor';

import styles from './Case.module.scss';

// Types
type Props = {
  coords: Coords
  className?: string,
  style?: { [name: string]: any }
};

// Component
const Case: FC<Props> = (props) => {
  const {
    coords,
    className, style
  } = props;

  return (
    <div className={classNames(styles.case, className)} style={style}>
      <Floor type="rock" />
      <div className={styles.data}>
        <Typography classes={{ root: styles.coords}}>
          { coords.x } { coords.y }
        </Typography>
      </div>
    </div>
  )
};

export default Case;
