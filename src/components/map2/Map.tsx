import React, { FC } from 'react';

import { generateZone } from 'data/Coords';
import DataMap, { Case } from 'data/Map';

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

  const centers = [
    { x: 3, y: 3 }
  ];

  const size = { x: 8, y: 8 };

  const style = {
    width: map.size.x * CASE_SIZE,
    height: map.size.y * CASE_SIZE
  };

  return (
    <div className={styles.container}>
      <div className={styles.map} style={style}>
        { generateZone(centers, size, (p, i, j) => {
          if (map.isOut(p)) return null;

          const c = map.get(p) as Case;
          return (
            <Floor
              type={c.floor} borders={map.borders2(p)} cliffs={map.cliffs(p)}
              style={{ position: 'absolute', top: j * CASE_SIZE, left: i * CASE_SIZE }}
            />
          );
        }) }
      </div>
    </div>
  );
};

export default Map;
