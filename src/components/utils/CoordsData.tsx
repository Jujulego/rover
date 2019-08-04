import React, { FC } from 'react';

import {
  Collapse,
  IconButton, Typography
} from "@material-ui/core";
import {
  LocationSearching as LocationSearchingIcon,
  LocationOff as LocationOffIcon,
  LocationOn as LocationOnIcon
} from '@material-ui/icons';

import { Coords } from 'data/Coords';

// Types
type Props = {
  label: string,
  coords: Coords,
  tracking?: boolean,
  onTrack?: () => void,
  onLocate?: () => void,

  className?: string
}

// Component
const CoordsData: FC<Props> = (props) => {
  const {
    label, coords,
    tracking = false, onTrack,
    onLocate,
    className
  } = props;

  // Rendering
  return (
    <div className={className}>
      <Typography>{label}: x = {coords.x} y = {coords.y}</Typography>
      { onTrack && (
        <IconButton size="small" onClick={onTrack}>
          { (tracking) ? <LocationOffIcon /> : <LocationOnIcon /> }
        </IconButton>
      ) }
      { onLocate && (
        <IconButton size="small" onClick={onLocate}><LocationSearchingIcon /></IconButton>
      ) }
    </div>
  )
};

export default CoordsData;