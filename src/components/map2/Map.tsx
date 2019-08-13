import React, { FC, useState, useEffect } from 'react';

import { useNode, usePrevious, useWindowEvent } from 'utils/hooks';

import Coords, { equal, generateZone, hash } from 'data/Coords';
import DataMap  from 'data/Map';

import Case from './Case';

import styles from './Map.module.scss';
import { CASE_SIZE } from './constants';
import { MapOptions } from 'components/map/Map';

// Types
type Props = {
  map?: DataMap, target?: Coords,
  center: Coords, zoom: number,
  options: { [name in MapOptions]?: boolean }
}

// Utils
function odd(x: number): number {
  return (x % 2) ? x : x + 1;
}

// Component
const Map: FC<Props> = (props) => {
  const {
    map, target,
    center, zoom, options
  } = props;

  // State
  const [delta, setDelta] = useState<Coords>({ x: 0, y: 0 });
  const [size, setSize] = useState<Coords>({ x: 1, y: 1 });

  // Refs
  const prevCenter = usePrevious(center);

  // Functions
  function computeSize(node: HTMLDivElement) {
    setSize({
      x: odd(Math.ceil(node.clientWidth / (96 * zoom))) + 4,
      y: odd(Math.ceil(node.clientHeight / (96 * zoom))) + 4
    });

    setDelta({
      x: (node.clientWidth - CASE_SIZE * zoom) / 2,
      y: (node.clientHeight - CASE_SIZE * zoom) / 2
    })
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

  useEffect(() => {
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
    top: delta.y - (center.y * CASE_SIZE * zoom),
    left: delta.x - (center.x * CASE_SIZE * zoom),
    transform: `scale(${zoom})`
  };

  return (
    <div ref={containerCb} className={styles.container}>
      <div className={styles.map} style={style}>
        { generateZone(centers, size, (pos) => (
          <Case
            key={hash(pos)}
            pos={pos} map={map} target={target && equal(pos, target)}
            coords={options.coords} height={options.height}
          />
        )) }
      </div>
    </div>
  );
};

export default Map;
