import { equal } from 'data/Coords';

import {
  ADD_ROVER,
  CLEAR_ROVERS,
  PLAY_ROVER,
  RESTART_ROVER,
  SET_ROVER_COLOR,
  START_ROVER,
  STOP_ROVER
} from './constants';
import { RoverActionTypes, RoversActionTypes, RoversState, RoverState } from './types';

// Initial state
const initialState: RoversState = {};

// Reducers
function roverReducer(state: RoverState, action: RoverActionTypes) {
  switch (action.type) {
    case PLAY_ROVER: {
      const track = [...state.track];
      const last = track[track.length-1];

      if (!last || !equal(last, state.data.pos)) {
        track.push(state.data.pos);
      }

      return {
        ...state,
        track,
        data: state.data.play()
      };
    }

    case START_ROVER:
    case STOP_ROVER:
      return {
        ...state,
        active: action.type === START_ROVER
      };

    case RESTART_ROVER:
      return {
        ...state,
        track: [],
        data: state.data.restart()
      };

    case SET_ROVER_COLOR:
      return {
        ...state,
        color: action.color
      };

    default:
      return state;
  }
}

export function roversReducer(state = initialState, action: RoversActionTypes) {
  switch (action.type) {
    case PLAY_ROVER:
    case START_ROVER:
    case STOP_ROVER:
    case RESTART_ROVER:
    case SET_ROVER_COLOR:
      return {
        ...state,
        [action.name]: roverReducer(state[action.name], action)
      };

    case ADD_ROVER:
      return {
        ...state,
        [action.name]: {
          data: action.data,
          color: action.color,
          track: [],
          active: false
        }
      };

    case CLEAR_ROVERS:
      return initialState;

    default:
      return state;
  }
}
