import React, { FC, memo } from 'react';

import { usePrevious } from 'utils/hooks';

import Coords, { equal, generateZone, hash } from 'data/Coords';
import Map from 'data/Map';

import Case from 'containers/map/Case';

// Types
interface Props {
  map: Map,
  center: Coords, size: Coords
}

// Component
const Zone: FC<Props> = (props) => {
  const {
    map,
    center, size
  } = props;

  // Ref
  const prevCenter = usePrevious(center);

  // Rendering
  const centers = [center];
  if (prevCenter && !equal(prevCenter, center)) {
    centers.push(prevCenter);
  }

  return (
    <>
      { generateZone(centers, size, pos => (
        <Case key={hash(pos)} pos={pos} map={map} />
      )) }
    </>
  )
};

function areEquals(pp: Props, np: Props): boolean {
  return pp.map === np.map && equal(pp.center, np.center) && equal(pp.size, np.size);
}

export default memo(Zone, areEquals);