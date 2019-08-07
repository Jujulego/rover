import React, { FC, Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Coords, distance, equal, generateZone } from 'data/Coords';
import { Map } from 'data/Map';

import { RoversState, RoverState } from 'store/rovers/types';

import { useDebouncedEffect, useNode, usePrevious, useWindowEvent } from 'utils/hooks';

import Case from './Case';
import Rover from './Rover';

import styles from './Zone.module.scss';

// Types
export type ZoneOptions = 'coords' | 'height' | 'slope';

type Props = {
  map: Map, center: Coords, zoom: number,
  rovers: RoversState, target: Coords,
  track?: string, debug?: string,
  options: { [name in ZoneOptions]?: boolean },
  onMove?: (_: Coords) => void
}

// Function
function odd(x: number): number {
  return (x % 2) ? x : x + 1;
}

function min(rd1: number, d2: number): number {
  return Math.sign(rd1) * Math.min(Math.abs(rd1), d2);
}

// Component
const Zone: FC<Props> = (props) => {
  const {
    map, center, zoom,
    rovers, target,
    debug,
    options,
    onMove
  } = props;

  // State
  const [size, setSize] = useState<Coords>({ x: 1, y: 1 });
  const [from, setFrom] = useState<Coords | null>(null);
  const [moving, setMoving] = useState(false);

  // Ref
  const prevCenter = usePrevious(center);

  // Function
  function handleCaseClick(c: Coords) {
    if (onMove) onMove(c);
  }

  function computeSize(node: HTMLDivElement) {
    setSize({
      x: odd(Math.ceil(node.clientWidth / (96 * zoom))),
      y: odd(Math.ceil(node.clientHeight / (96 * zoom)))
    });
  }

  function mapRovers<T>(pos: Coords, cb: (name: string, rover: RoverState) => T): Array<T> {
    const results: Array<T> = [];

    Object.keys(rovers).forEach((name) => {
      const rover = rovers[name];
      if (equal(rover.data.pos, pos)) {
        results.push(cb(name, rover))
      }
    });

    return results;
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

  useEffect(() => {
    setMoving(true);
    setFrom(prevCenter);
  }, [center.x, center.y]);

  useEffect(() => {
    if (moving) {
      setMoving(false);
    }
  }, [moving]);

  // Rendering
  const centers = [prevCenter || center];
  const translate = { top: 0, left: 0, transform: `scale(${zoom})` };

  if (prevCenter != null && from != null) {
    centers.push(from);

    translate.top = min(from.y - prevCenter.y, size.y) * 48 * zoom;
    translate.left = min(from.x - prevCenter.x, size.x) * 48 * zoom;

    if (moving) {
      translate.top *= -1;
      translate.left *= -1;
    }
  }

  return (
    <div ref={containerCb} className={styles.container}>
      <div className={clsx(styles.grid, { [styles.moved]: !moving })} style={translate}>
        { generateZone(centers, size, (c, i, j) => (
          map.isOut(c) ? (
            <div key={`(${c.x} ${c.y})`} style={{ gridColumn: i + 1, gridRow: j + 1 }} />
          ) : (
            <Fragment key={`(${c.x} ${c.y})`}>
              <Case
                style={{ gridColumn: i + 1, gridRow: j + 1 }}
                map={map} pos={c} showCoords={options.coords} showHeight={options.height}
                debug={debug !== undefined ? rovers[debug].data : undefined}
                isTarget={equal(c, target)}
                slope={(options.slope && (distance(center, c) === 1)) ? map.slope(center, c) : undefined}
                onClick={handleCaseClick}
              />
              { mapRovers(c, (name, rover) => (
                <Rover key={name}
                  style={{ gridColumn: i + 1, gridRow: j + 1 }}
                  data={rover.data} color={rover.color}
                  onClick={handleCaseClick}
                />
              )) }
            </Fragment>
          )
        )) }
      </div>
    </div>
  );
};

export default Zone;
