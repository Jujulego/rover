import { Coords } from 'data/Coords';
import { ZoneOptions } from 'components/map/Zone';

import { TOGGLE_OPTION, MOVE_ZONE, SET_ZOOM, TRACK_ROVER, STOP_TRACKING, DEBUG_ROVER } from './constants';

// Actions types
interface MoveZoneAction {
  type: typeof MOVE_ZONE,
  center: Coords
}

interface TrackRoverAction {
  type: typeof TRACK_ROVER,
  name: string,
}

interface StopTrackingAction {
  type: typeof STOP_TRACKING,
}

interface ToggleOptionAction {
  type: typeof TOGGLE_OPTION,
  name: ZoneOptions
}

interface SetZoomAction {
  type: typeof SET_ZOOM,
  zoom: number
}

interface DebugRoverAction {
  type: typeof DEBUG_ROVER,
  rover: string | undefined
}

export type ZoneActionTypes = ToggleOptionAction | MoveZoneAction | TrackRoverAction | StopTrackingAction | SetZoomAction | DebugRoverAction

// State type
export interface ZoneState {
  center: Coords,
  zoom: number,
  track?: string,
  debug?: string,
  options: { [name in ZoneOptions]?: boolean }
}
