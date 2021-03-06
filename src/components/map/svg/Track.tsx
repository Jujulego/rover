import React, { FC, useMemo } from 'react';

import { RoverColor, roverColors } from 'assets/rovers';

import Coords from 'data/Coords';

import { p2m } from '../constants';

// Types
type Props = {
  pos: Coords,
  track: Array<Coords>,
  color: RoverColor
}

// Component
const Track: FC<Props> = (props) => {
  const { pos, track, color } = props;

  // Computing
  const path = useMemo(() => {
    return track.reduceRight((path, pos) => {
      return `${path} L ${p2m(pos.x)} ${p2m(pos.y)}`;
    }, `M ${p2m(pos.x)} ${p2m(pos.y)}`)
  }, [pos, track]);

  // Rendering
  return (
    <path d={path} fill="transparent" stroke={roverColors[color]} strokeWidth={6} />
  )
};

export default Track;
