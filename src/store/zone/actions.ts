import Coords from 'data/Coords';
import Map from 'data/Map';
import { ZoneOptions } from 'components/map/Zone';

import { DEBUG_ROVER, MOVE_ZONE, SET_LEVEL, SET_MAP, SET_ZOOM, STOP_TRACKING, TOGGLE_OPTION, TRACK_ROVER } from './constants';
import { ZoneActionTypes } from './types';

// Actions
export const toggleOption = (name: ZoneOptions): ZoneActionTypes => ({ type: TOGGLE_OPTION, name });
export const moveZone = (center: Coords): ZoneActionTypes => ({ type: MOVE_ZONE, center });
export const trackRover = (name: string): ZoneActionTypes => ({ type: TRACK_ROVER, name });
export const stopTracking = (): ZoneActionTypes => ({ type: STOP_TRACKING });
export const setLevel = (level: string): ZoneActionTypes => ({ type: SET_LEVEL, level });
export const setMap = (map: Map): ZoneActionTypes => ({ type: SET_MAP, map });
export const setZoom = (zoom: number): ZoneActionTypes => ({ type: SET_ZOOM, zoom });
export const debugRover = (rover?: string): ZoneActionTypes => ({ type: DEBUG_ROVER, rover });
