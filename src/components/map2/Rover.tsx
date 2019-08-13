import React, { FC } from 'react';

import rovers from 'assets/rovers';

import { RoverState } from 'store/rovers/types';

import { CASE_SIZE } from './constants';
import styles from './Rover.module.scss';

// Types
type Props = {
  rover: RoverState
}

// Component
const Rover: FC<Props> = (props) => {
  const { color, data } = props.rover;

  // Rendering
  return (
    <div className={styles.rover} style={{ top: data.pos.y * CASE_SIZE, left: data.pos.x * CASE_SIZE }}>
      <img src={rovers[color]} alt={`${color} rover`} />
      <div className={styles.gauge}>
        <div style={{ height: `${data.energy * 100 / data.gaugeSize}%`}} />
      </div>
    </div>
  );
};

export default Rover;
