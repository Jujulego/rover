import { DEBUG_ROVER, MOVE_ZONE, SET_MAP, SET_ZOOM, STOP_TRACKING, TOGGLE_OPTION, TRACK_ROVER } from './constants';
import { ZoneActionTypes, ZoneState } from './types';

// Initial state
const initialState: ZoneState = {
  center: { x: 1, y: 1 },
  zoom: 1,
  options: {
    coords: true,
    height: false,
    slope: false
  }
};

// Reducers
function optionsReducer(state = initialState.options, action: ZoneActionTypes) {
  switch (action.type) {
    case TOGGLE_OPTION:
      return { ...state, [action.name]: !(state[action.name]) };

    default:
      return state;
  }
}

export function zoneReducer(state = initialState, action: ZoneActionTypes) {
  switch (action.type) {
    case TOGGLE_OPTION:
      return { ...state, options: optionsReducer(state.options, action) };

    case MOVE_ZONE:
      return { ...state, center: action.center };

    case TRACK_ROVER:
      return { ...state, track: action.name };

    case STOP_TRACKING:
      return { ...state, track: undefined };

    case SET_MAP:
      return { ...state, level: action.level, map: action.map };

    case SET_ZOOM:
      return { ...state, zoom: action.zoom };

    case DEBUG_ROVER:
      return { ...state, debug: action.rover };

    default:
      return state;
  }
}
