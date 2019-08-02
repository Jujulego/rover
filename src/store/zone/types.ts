import { Coords } from 'data/Coords';
import { ZoneOptions } from 'components/map/Zone';

import { TOGGLE_OPTION, MOVE_ZONE, SET_ZOOM } from './constants';

// Actions types
interface MoveZoneAction {
  type: typeof MOVE_ZONE,
  center: Coords
}

interface ToggleOptionAction {
  type: typeof TOGGLE_OPTION,
  name: ZoneOptions
}

interface SetZoomAction {
  type: typeof SET_ZOOM,
  zoom: number
}

export type ZoneActionTypes = ToggleOptionAction | MoveZoneAction | SetZoomAction

// State type
export interface ZoneState {
  center: Coords,
  zoom: number,
  options: { [name in ZoneOptions]?: boolean }
}
