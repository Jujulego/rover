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

// Function
function odd(x: number): number {
  return (x % 2) ? x : x + 1;
}

function computeSize(node: HTMLDivElement, setSize: (c: Coords) => void) {
  setSize({
    x: odd(Math.ceil(node.clientWidth / 96)),
    y: odd(Math.ceil(node.clientHeight / 96))
  });
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
    computeSize(node, setSize);
  }, []);

  // Effect
  useEffect(() => {
    function handleResize() {
      if (containerRef.current != null) {
        computeSize(containerRef.current, setSize);
      }
    }

    // Event
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
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
      <Fab classes={{ root: styles.up }} size="small"
           onClick={() => handleMove(0, -1)}>
        <ArrowUpwardIcon />
      </Fab>
      <Fab classes={{ root: styles.right }} size="small"
           onClick={() => handleMove(1, 0)}>
        <ArrowForwardIcon />
      </Fab>
      <Fab classes={{ root: styles.down }} size="small"
           onClick={() => handleMove(0, 1)}>
        <ArrowDownwardIcon />
      </Fab>
      <Fab classes={{ root: styles.left }} size="small"
           onClick={() => handleMove(-1, 0)}>
        <ArrowBackIcon />
      </Fab>
    </div>
  );
};

export default Zone;
