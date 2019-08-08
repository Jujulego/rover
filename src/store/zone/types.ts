import Coords from 'data/Coords';
import Level from 'data/Level';
import Map from 'data/Map';

import { ZoneOptions } from 'components/map/Zone';

import { DEBUG_ROVER, MOVE_ZONE, SET_LEVEL, SET_MAP, SET_ZOOM, STOP_TRACKING, TOGGLE_OPTION, TRACK_ROVER } from './constants';

// Actions types
interface DebugRoverAction {
  type: typeof DEBUG_ROVER,
  rover: string | undefined
}

interface MoveZoneAction {
  type: typeof MOVE_ZONE,
  center: Coords
}

interface SetLevelAction {
  type: typeof SET_LEVEL,
  level: Level
}

interface SetMapAction {
  type: typeof SET_MAP,
  map: Map,
}

interface SetZoomAction {
  type: typeof SET_ZOOM,
  zoom: number
}

interface StopTrackingAction {
  type: typeof STOP_TRACKING,
}

interface ToggleOptionAction {
  type: typeof TOGGLE_OPTION,
  name: ZoneOptions
}

interface TrackRoverAction {
  type: typeof TRACK_ROVER,
  name: string,
}

export type ZoneActionTypes = DebugRoverAction | SetLevelAction | SetMapAction | SetZoomAction | StopTrackingAction | MoveZoneAction | ToggleOptionAction | TrackRoverAction

// State type
export interface ZoneState {
  level?: Level, map?: Map,
  center: Coords, zoom: number,
  track?: string,
  debug?: string,
  options: { [name in ZoneOptions]?: boolean }
}
