import { CLOSE, OPEN, TOGGLE } from './constants';
import { DrawerActionTypes, DrawerState } from './types';

// Initial state
const initialState: DrawerState = {
  open: false
};

// Reducers
export function drawerReducer(state = initialState, action: DrawerActionTypes) {
  switch (action.type) {
    case OPEN:
      return { open: true };

    case CLOSE:
      return { open: false };

    case TOGGLE:
      return { open: !state.open };

    default:
      return state;
  }
}
