import React, { FC } from 'react'

import rovers, { RoverColor } from 'assets/rovers';
import { RoverAI } from 'data/RoverAI';

import styles from './Rover.module.scss';

// Types
type Props = {
  data: RoverAI,
  color?: RoverColor,
  style?: { [name: string]: any },
}

// Component
const Rover: FC<Props> = (props) => {
  const {
    data,
    color = 'blue',
    style
  } = props;

  return (
    <div className={styles.rover} style={style}>
      <img src={rovers[color]} alt={`${color} rover`} />
    </div>
  );
};

export default Rover;