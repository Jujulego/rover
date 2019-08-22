import { DEBUG_ROVER, MOVE_ZONE, SET_LEVEL, SET_MAP, SET_ZOOM, STOP_TRACKING, TOGGLE_OPTION, TRACK_ROVER } from './constants';
import { ZoneActionTypes, ZoneState } from './types';

// Initial state
const initialState: ZoneState = {
  center: { x: 1, y: 1 },
  zoom: 1,
  options: {
    coords: true,
    height: false,
    tracks: true
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

    case DEBUG_ROVER:
      return { ...state, debug: action.value };

    case MOVE_ZONE:
      return { ...state, center: action.value };

    case SET_LEVEL:
      return { ...state, level: action.value, map: undefined };

    case SET_MAP:
      return { ...state, map: action.value };

    case STOP_TRACKING:
      return { ...state, track: undefined };

    case SET_ZOOM:
      return { ...state, zoom: action.value };

    case TRACK_ROVER:
      return { ...state, track: action.value };

    default:
      return state;
  }
}
