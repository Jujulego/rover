import { RoversActionTypes, RoverState } from './types';
import { ADD_ROVER } from './constants';

// Initial state
const initialState: { [name: string]: RoverState } = {};

// Reducers
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

    default:
      return state;
  }
}