import React, { FC } from 'react'

import Coords from 'data/Coords';
import RoverAI from 'data/RoverAI';

import rovers, { RoverColor } from 'assets/rovers';
import styles from './Rover.module.scss';

// Types
type Props = {
  data: RoverAI,
  color?: RoverColor,
  style?: { [name: string]: any },
  onClick?: (c: Coords) => void
}

// Component
const Rover: FC<Props> = (props) => {
  const {
    data,
    color = 'blue',
    style,
    onClick
  } = props;

  // Functions
  function handleClick() {
    if (onClick) onClick(data.pos);
  }

  // Rendering
  return (
    <div className={styles.rover} style={style} onClick={handleClick}>
      <img src={rovers[color]} alt={`${color} rover`} />
      <div className={styles.gauge}>
        <div style={{ height: `${data.energy * 100 / data.gaugeSize}%`}} />
      </div>
    </div>
  );
};

export default Rover;
