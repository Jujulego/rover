import { Coords } from 'data/Coords';
import { ZoneOptions } from 'components/map/Zone';

import { TOGGLE_OPTION, MOVE_ZONE, SET_ZOOM, TRACK_ROVER, STOP_TRACKING } from './constants';

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

export type ZoneActionTypes = ToggleOptionAction | MoveZoneAction | TrackRoverAction | StopTrackingAction | SetZoomAction

// State type
export interface ZoneState {
  center: Coords,
  zoom: number,
  track?: string,
  options: { [name in ZoneOptions]?: boolean }
}
