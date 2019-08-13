import React, { FC, useState, useEffect } from 'react';

import { CircularProgress, Typography } from '@material-ui/core';

import { useNode, usePrevious, useWindowEvent } from 'utils/hooks';

import Coords, { equal, generateZone, hash } from 'data/Coords';
import Level from 'data/Level';
import DataMap  from 'data/Map';

import { RoversState } from 'store/rovers/types';

import { MapOptions } from 'components/map/Map';
import Case from './Case';
import Rover from './Rover';

import styles from './Map.module.scss';
import { CASE_SIZE } from './constants';

// Types
type Props = {
  level?: Level, map?: DataMap,
  center: Coords, zoom: number,
  options: { [name in MapOptions]?: boolean }
  rovers: RoversState,
  onMove: (p: Coords) => void
}

// Utils
function odd(x: number): number {
  return (x % 2) ? x : x + 1;
}

// Component
const Map: FC<Props> = (props) => {
  const {
    level, map,
    center, zoom, options,
    rovers,
    onMove
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

  function handleMoveTo(pos: Coords) {
    return () => onMove(pos);
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
  if (!map || !level) {
    return (
      <div className={styles.container}>
        { level && (
          <div className={styles.loader}>
            <CircularProgress />
            <Typography>Chargement du niveau "{level.name}" ...</Typography>
          </div>
        ) }
      </div>
    );
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
            pos={pos} map={map} target={equal(pos, level.target)}
            coords={options.coords} height={options.height}
            onClick={handleMoveTo(pos)}
          />
        )) }
        { Object.keys(rovers).map(rover => <Rover key={rover} rover={rovers[rover]} />) }
      </div>
    </div>
  );
};

export default Map;
