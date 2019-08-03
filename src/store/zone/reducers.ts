import { TOGGLE_OPTION, MOVE_ZONE, SET_ZOOM, TRACK_ROVER, STOP_TRACKING } from './constants';
import { ZoneActionTypes, ZoneState } from './types';

// Initial state
const initialState: ZoneState = {
  center: { x: 1, y: 1 },
  zoom: 1,
  options: {
    coords: true,
    distance: false,
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

    case SET_ZOOM:
      return { ...state, zoom: action.zoom };

    default:
      return state;
  }
}
