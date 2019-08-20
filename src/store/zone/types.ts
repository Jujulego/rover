import Coords from 'data/Coords';
import Level from 'data/Level';
import Map from 'data/Map';

import { MapOptions } from 'components/map/Map';

import {
  DEBUG_ROVER, MOVE_ZONE, SET_LEVEL, SET_MAP, SET_ZOOM, STOP_TRACKING, TOGGLE_OPTION, TRACK_ROVER,
  SET_EDITING
} from './constants';

// Actions types
interface DebugRoverAction {
  type: typeof DEBUG_ROVER,
  rover: string | undefined
}

interface MoveZoneAction {
  type: typeof MOVE_ZONE,
  center: Coords
}

interface SetEditingAction {
  type: typeof SET_EDITING,
  value: boolean
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
  name: MapOptions
}

interface TrackRoverAction {
  type: typeof TRACK_ROVER,
  name: string,
}

export type ZoneActionTypes =
  DebugRoverAction | SetLevelAction | SetMapAction | SetZoomAction | StopTrackingAction | MoveZoneAction | ToggleOptionAction | TrackRoverAction |
  SetEditingAction

// State type
export interface ZoneState {
  level?: Level, map?: Map,
  center: Coords, zoom: number,
  track?: string,
  debug?: string,
  editing: boolean,
  options: { [name in MapOptions]?: boolean }
}
