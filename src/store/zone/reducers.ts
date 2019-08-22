import {
  DEBUG_ROVER, MOVE_ZONE, SET_LEVEL, SET_MAP, SET_ZOOM, STOP_TRACKING, TOGGLE_OPTION, TRACK_ROVER,
  SET_EDITING, CHANGE_TYPE
} from './constants';
import { ZoneActionTypes, ChangeActionTypes, ZoneState } from './types';

// Initial state
const initialState: ZoneState = {
  center: { x: 1, y: 1 },
  zoom: 1,
  options: {
    coords: true,
    height: false,
    tracks: true
  },
  editing: false,
  history: new Array<ChangeActionTypes>()
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

    case SET_EDITING:
      return { ...state, editing: action.value };

    case CHANGE_TYPE:
      if (state.map && state.editing) {
        state.map.update(action.pos, { floor: action.value });
      }

      return { ...state, history: [...state.history, action] };

    default:
      return state;
  }
}
