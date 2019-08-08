import Coords from 'data/Coords';
import { ZoneOptions } from 'components/map/Zone';

import { DEBUG_ROVER, MOVE_ZONE, SET_ZOOM, STOP_TRACKING, TOGGLE_OPTION, TRACK_ROVER } from './constants';
import { ZoneActionTypes } from './types';

// Actions
export const toggleOption = (name: ZoneOptions): ZoneActionTypes => ({ type: TOGGLE_OPTION, name });
export const moveZone = (center: Coords): ZoneActionTypes => ({ type: MOVE_ZONE, center });
export const trackRover = (name: string): ZoneActionTypes => ({ type: TRACK_ROVER, name });
export const stopTracking = (): ZoneActionTypes => ({ type: STOP_TRACKING });
export const setZoom = (zoom: number): ZoneActionTypes => ({ type: SET_ZOOM, zoom });
export const debugRover = (rover?: string): ZoneActionTypes => ({ type: DEBUG_ROVER, rover });
