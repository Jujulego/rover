import React, { FC } from 'react';

import Direction from 'data/Direction';
import DataMap from 'data/Map';

import Floor from './Floor';

import styles from './Map.module.scss';

// Types
type Props = {
  map?: DataMap
}

// Constants
const CASE_SIZE = 96;

// Component
const Map: FC<Props> = (props) => {
  const { map } = props;

  // Rendering
  if (!map) {
    return <div className={styles.container} />;
  }

  const style = {
    width: map.size.x * CASE_SIZE,
    height: map.size.y * CASE_SIZE
  };

  return (
    <div className={styles.container}>
      <div className={styles.map} style={style}>
        <Floor type='ice' borders={{ [Direction.B]: true }} />
        <Floor type='hole' />
      </div>
    </div>
  );
};

export default Map;