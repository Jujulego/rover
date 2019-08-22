import { setActionCreator as setAC } from 'utils/actions/SetAction';

import { MapOptions } from 'components/map/Map';

import { DEBUG_ROVER, MOVE_ZONE, SET_LEVEL, SET_MAP, SET_ZOOM, STOP_TRACKING, TOGGLE_OPTION, TRACK_ROVER } from './constants';
import { ZoneActionTypes } from './types';

// Actions
export const toggleOption = (name: MapOptions): ZoneActionTypes => ({ type: TOGGLE_OPTION, name });
export const stopTracking = (): ZoneActionTypes => ({ type: STOP_TRACKING });

export const debugRover = setAC<ZoneActionTypes,typeof DEBUG_ROVER>(DEBUG_ROVER);
export const moveZone = setAC<ZoneActionTypes,typeof MOVE_ZONE>(MOVE_ZONE);
export const setLevel = setAC<ZoneActionTypes,typeof SET_LEVEL>(SET_LEVEL);
export const setMap = setAC<ZoneActionTypes,typeof SET_MAP>(SET_MAP);
export const setZoom = setAC<ZoneActionTypes,typeof SET_ZOOM>(SET_ZOOM);
export const trackRover = setAC<ZoneActionTypes,typeof TRACK_ROVER>(TRACK_ROVER);
