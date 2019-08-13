import React, { FC, useState, useEffect } from 'react';

import { CircularProgress, Typography } from '@material-ui/core';

import { useNode, usePrevious, useWindowEvent } from 'utils/hooks';

import CachedRover from 'data/rovers/CachedRover';
import DStarRover from 'data/rovers/DStarRover';
import Coords, { equal, generateZone, hash } from 'data/Coords';
import Level from 'data/Level';
import DataMap  from 'data/Map';

import { RoversState, RoverState } from 'store/rovers/types';

import { MapOptions } from 'components/map/Map';

import { CASE_SIZE } from './constants';
import DStarTree from './svg/DStarTree';
import Track from './svg/Track';
import Case from './Case';
import Rover from './Rover';

import styles from './Map.module.scss';

// Types
type Props = {
  level?: Level, map?: DataMap,
  center: Coords, zoom: number,
  options: { [name in MapOptions]?: boolean },
  rovers: RoversState, debug?: string,
  onMove: (p: Coords) => void
}

// Utils
function odd(x: number): number {
  return (x % 2) ? x : x + 1;
}

function mapRovers<T>(rovers: RoversState, cb: (name: string, rover: RoverState) => T): Array<T> {
  return Object.keys(rovers).map(name => cb(name, rovers[name]));
}

// Component
const Map: FC<Props> = (props) => {
  const {
    level, map,
    center, zoom, options,
    rovers, debug,
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
      x: odd(Math.ceil(node.clientWidth / (96 * zoom))) + 2,
      y: odd(Math.ceil(node.clientHeight / (96 * zoom))) + 2
    });

    setDelta({
      x: (node.clientWidth - CASE_SIZE * zoom) / 2,
      y: (node.clientHeight - CASE_SIZE * zoom) / 2
    })
  }

  function handleMoveTo(pos: Coords) {
    return () => onMove(pos);
  }

  function isUnknown(pos: Coords): boolean {
    if (!debug) return false;

    const rover = rovers[debug];
    if (rover.data instanceof CachedRover) {
      return rover.data.getCachedCase(pos).floor === undefined;
    }

    return false;
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
            coords={options.coords} height={options.height} unknown={isUnknown(pos)}
            onClick={handleMoveTo(pos)}
          />
        )) }
        { options.tracks && (
          <svg>
            { mapRovers(rovers, (name, rover) => (
              <Track key={name} pos={rover.data.pos} track={rover.track} color={rover.color} />
            )) }
            { (debug && rovers[debug].data instanceof DStarRover) && (
              <DStarTree rover={rovers[debug].data as DStarRover} map={map} zone={{ center, size }} />
            ) }
          </svg>
        ) }
        { mapRovers(rovers, (name, rover) => <Rover key={name} rover={rover} />) }
      </div>
    </div>
  );
};

export default Map;
