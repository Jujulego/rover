import React, { FC, useState } from 'react';

import { useDebouncedEffect, useNode, usePrevious, useWindowEvent } from 'utils/hooks';

import Coords, { equal, generateZone } from 'data/Coords';
import DataMap, { Case } from 'data/Map';

import Floor from './Floor';

import styles from './Map.module.scss';

// Types
type Props = {
  map?: DataMap,
  center: Coords, zoom: number
}

// Constants
const CASE_SIZE = 96;

// Utils
function odd(x: number): number {
  return (x % 2) ? x : x + 1;
}

// Component
const Map: FC<Props> = (props) => {
  const {
    map,
    center, zoom
  } = props;

  // State
  const [size, setSize] = useState<Coords>({ x: 1, y: 1 });

  // Refs
  const prevCenter = usePrevious(center);

  // Functions
  function computeSize(node: HTMLDivElement) {
    setSize({
      x: odd(Math.ceil(node.clientWidth / (96 * zoom))),
      y: odd(Math.ceil(node.clientHeight / (96 * zoom)))
    });
  }

  // Callback
  const [containerRef, containerCb] = useNode((node: HTMLDivElement) => {
    if (node != null) computeSize(node);
  }, []);

  // Effects
  useWindowEvent('resize', () => {
    if (containerRef.current != null) {
      computeSize(containerRef.current);
    }
  });

  useDebouncedEffect(() => {
    if (containerRef.current != null) {
      computeSize(containerRef.current);
    }
  }, [zoom]);

  // Rendering
  if (!map) {
    return <div className={styles.container} />;
  }

  const centers = [center];
  if (prevCenter && !equal(prevCenter, center)) {
    centers.push(prevCenter);
  }

  const style = {
    width: map.size.x * CASE_SIZE,
    height: map.size.y * CASE_SIZE,
    top: -(center.y - (size.y - 1) / 2) * CASE_SIZE,
    left: -(center.x - (size.x - 1) / 2) * CASE_SIZE,
    transform: `scale(${zoom})`
  };

  return (
    <div ref={containerCb} className={styles.container}>
      <div className={styles.map} style={style}>
        { generateZone(centers, size, (p) => {
          if (map.isOut(p)) return null;

          const c = map.get(p) as Case;
          return (
            <Floor
              type={c.floor} borders={map.borders2(p)} cliffs={map.cliffs(p)}
              style={{ position: 'absolute', top: p.y * CASE_SIZE, left: p.x * CASE_SIZE }}
            />
          );
        }) }
      </div>
    </div>
  );
};

export default Map;
