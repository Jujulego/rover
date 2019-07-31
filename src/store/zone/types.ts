import { Coords } from 'data/Coords';
import { ZoneOptions } from 'components/map/Zone';

import { TOGGLE_OPTION, MOVE_ZONE } from './constants';

// Actions types
interface MoveZoneAction {
  type: typeof MOVE_ZONE,
  center: Coords
}

interface ToggleOptionAction {
  type: typeof TOGGLE_OPTION,
  name: ZoneOptions
}

export type ZoneActionTypes = ToggleOptionAction | MoveZoneAction

// State type
export interface ZoneState {
  center: Coords,
  options: { [name in ZoneOptions]?: boolean }
}
