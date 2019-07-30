import { Coords } from 'data/Coords';

import { MOVE_ZONE } from './constants';
import { ZoneActionTypes } from './types';

// Actions
export function moveZone(center: Coords): ZoneActionTypes {
  return { type: MOVE_ZONE, center }
}
