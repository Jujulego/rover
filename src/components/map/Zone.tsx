import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { Coords, generateZone } from '../../data/Coords';
import { Map } from '../../data/Map';

import Case from './Case';

import styles from './Zone.module.scss';

// Types
type Props = { map: Map, center: Coords }

// Component
const Zone: FC<Props> = (props) => {
  const { map, center } = props;

  // State
  const [size, setSize] = useState<Coords>({ x: 1, y: 1 });

  // Function
  function computeSize(node: HTMLDivElement) {
    setSize({
      x: Math.round((node.clientWidth + 64) / 96),
      y: Math.round((node.clientHeight + 64) / 96)
    });
  }

  // Ref
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Callback
  const containerCb = useCallback((node: HTMLDivElement) => {
    containerRef.current = node;
    computeSize(node);
  }, []);

  // Rendering
  return (
    <div ref={containerCb} className={styles.container}>
      <div className={styles.grid}>
        { generateZone(center, size, (c, i, j) => (
          <Case key={`${i}${j}`} style={{ gridColumn: i + 1, gridRow: j + 1 }}
                map={map} pos={c} />
        )) }
      </div>
    </div>
  );
};

export default Zone;
