import {
  ADD_ROVER,
  SET_ROVER_COLOR
} from './constants';
import { RoverActionTypes, RoversActionTypes, RoverState } from './types';

// Initial state
const initialState: { [name: string]: RoverState } = {};

// Reducers
function roverReducer(state: RoverState, action: RoverActionTypes) {
  switch (action.type) {
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
    case ADD_ROVER:
      return {
        ...state,
        [action.name]: {
          data: action.data,
          color: action.color
        }
      };

    case SET_ROVER_COLOR:
      return {
        ...state,
        [action.name]: roverReducer(state[action.name], action)
      };

    default:
      return state;
  }
}