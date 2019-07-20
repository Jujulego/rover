import React, { FC } from 'react';

import { Coords, generateZone } from '../../data/Coords';
import { Map } from '../../data/Map';

import Case from './Case';

import styles from './Zone.module.scss';

// Types
type Props = { map: Map, center: Coords, size: number }

// Component
const Zone: FC<Props> = (props) => {
  const { map, center, size } = props;

  // Rendering
  return (
    <div className={styles.grid}>
      { generateZone(center, size, (c, i, j) => (
        <Case key={`${i}${j}`} style={{ gridColumn: i + 1, gridRow: j + 1 }}
              map={map} pos={c} />
      )) }
    </div>
  );
};

export default Zone;
