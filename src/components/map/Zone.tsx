import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Fab } from "@material-ui/core";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";

import { Coords, generateZone } from '../../data/Coords';
import { Map } from '../../data/Map';

import Case from './Case';

import styles from './Zone.module.scss';

// Types
type Props = {
  map: Map, center: Coords,
  onMove?: (_: Coords) => void
}

// Component
const Zone: FC<Props> = (props) => {
  const {
    map, center,
    onMove
  } = props;

  // State
  const [size, setSize] = useState<Coords>({ x: 1, y: 1 });

  // Function
  function computeSize(node: HTMLDivElement) {
    setSize({
      x: Math.round((node.clientWidth + 64) / 96),
      y: Math.round((node.clientHeight + 64) / 96)
    });
  }

  function handleMove(fx: number, fy: number) {
    if (onMove) {
      onMove({
        x: center.x + (fx * size.x),
        y: center.y + (fy * size.y)
      });
    }
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
      <Fab classes={{ root: styles.up }} onClick={() => handleMove(0, -1)}>
        <ArrowUpwardIcon />
      </Fab>
      <Fab classes={{ root: styles.right }} onClick={() => handleMove(1, 0)}>
        <ArrowForwardIcon />
      </Fab>
      <Fab classes={{ root: styles.down }}  onClick={() => handleMove(0, 1)}>
        <ArrowDownwardIcon />
      </Fab>
      <Fab classes={{ root: styles.left }}  onClick={() => handleMove(-1, 0)}>
        <ArrowBackIcon />
      </Fab>
    </div>
  );
};

export default Zone;
