import React, { FC, useEffect, useState } from 'react';

import { CircularProgress, Typography } from '@material-ui/core';

import { useNode, useWindowEvent } from 'utils/hooks';

import Coords from 'data/Coords';
import Level from 'data/Level';
import DataMap from 'data/Map';
import { hasTree } from 'data/rovers/bases/TreeMixin';

import { RoversState, RoverState } from 'store/rovers/types';

import Track from 'containers/map/svg/Track';

import { CASE_SIZE } from './constants';
import Tree from './svg/Tree';
import Rover from './Rover';
import Zone from './Zone';

import styles from './Map.module.scss';

// Types
export type MapOptions = 'coords' | 'height' | 'slope' | 'tracks';

type Props = {
  level?: Level, map?: DataMap,
  center: Coords, zoom: number,
  options: { [name in MapOptions]?: boolean },
  rovers: RoversState, debug?: string
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
    rovers, debug
  } = props;

  // State
  const [delta, setDelta] = useState<Coords>({ x: 0, y: 0 });
  const [size, setSize] = useState<Coords>({ x: 1, y: 1 });

  // Functions
  function computeSize(node: HTMLDivElement) {
    setSize({
      x: odd(Math.ceil(node.clientWidth / (96 * zoom))),
      y: odd(Math.ceil(node.clientHeight / (96 * zoom)))
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
  }, [zoom]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <Zone map={map} center={center} size={size} />
        { (options.tracks || debug) && (
          <svg>
            { mapRovers(rovers, name => (
              <Track key={name} name={name} />
            )) }
            { (() => {
              if (!debug) return null;
              const rover = rovers[debug].data;

              if (hasTree(rover)) {
                return <Tree rover={rover} map={map} zone={{ center, size }} />
              }

              return null;
            })() }
          </svg>
        ) }
        { mapRovers(rovers, (name, rover) => <Rover key={name} rover={rover} />) }
      </div>
    </div>
  );
};

export default Map;
