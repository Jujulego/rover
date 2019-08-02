import { TOGGLE_OPTION, MOVE_ZONE, SET_ZOOM } from './constants';
import { ZoneActionTypes, ZoneState } from './types';

// Initial state
const initialState: ZoneState = {
  center: { x: 0, y: 0 },
  zoom: 1,
  options: {
    coords: true,
    distance: true,
    height: true,
    slope: true
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

    case SET_ZOOM:
      return { ...state, zoom: action.zoom };

    default:
      return state;
  }
}
