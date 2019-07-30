import { Coords } from 'data/Coords';

import { MOVE_ZONE } from './constants';

// Actions types
interface MoveZoneAction {
  type: typeof MOVE_ZONE,
  center: Coords
}

export type ZoneActionTypes = MoveZoneAction

// State type
export interface ZoneState {
  center: Coords
}
