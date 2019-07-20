import React, { FC } from 'react';

import { Coords, generateZone } from '../../data/coords';

import Case from './Case';

import styles from './Zone.module.scss';

// Component
const Zone: FC<{ center: Coords, size: number }> = (props) => {
  const { center, size } = props;

  // Rendering
  return (
    <div className={styles.grid}>
      { generateZone(center, size, (c, i, j) => (
        <Case key={`${i}${j}`} style={{ gridColumn: i + 1, gridRow: j + 1 }}
              coords={c} />
      )) }
    </div>
  );
};

export default Zone;
