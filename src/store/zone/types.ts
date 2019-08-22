import { Action } from 'redux';

import SetAction from 'utils/actions/SetAction';

import Coords from 'data/Coords';
import Level from 'data/Level';
import Map, { FloorType } from 'data/Map';

import { MapOptions } from 'components/map/Map';

import {
  CHANGE_TYPE,
  DEBUG_ROVER,
  MOVE_ZONE,
  SET_LEVEL,
  SET_MAP,
  SET_ZOOM,
  STOP_TRACKING,
  TOGGLE_OPTION,
  TRACK_ROVER
} from './constants';

// State type
export interface ZoneState {
  level?: Level, map?: Map,
  center: Coords, zoom: number,
  track?: string,
  debug?: string,
  options: { [name in MapOptions]?: boolean }
}

// Actions types
interface ToggleOptionAction {
  type: typeof TOGGLE_OPTION,
  name: MapOptions
}

interface ChangeAction<A,T> extends Action<A> {
  case: Coords,
  set: T, was: T
}

export type ChangeActionTypes = ChangeAction<typeof CHANGE_TYPE,FloorType>;

export type ZoneActionTypes = Action<typeof STOP_TRACKING> | ToggleOptionAction |
  SetAction<typeof DEBUG_ROVER,string | undefined> | SetAction<typeof MOVE_ZONE,Coords> | SetAction<typeof TRACK_ROVER,string> |
  SetAction<typeof SET_LEVEL,Level> | SetAction<typeof SET_MAP,Map> | SetAction<typeof SET_ZOOM,number>
