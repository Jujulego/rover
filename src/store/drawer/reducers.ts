import { boolReducer } from 'utils/actions/BoolAction';

import { DRAWER } from './constants';
import { DrawerActionTypes, DrawerState } from './types';

// Initial state
const initialState: DrawerState = {
  open: false
};

// Reducers
export function drawerReducer(state = initialState, action: DrawerActionTypes) {
  switch (action.type) {
    case DRAWER:
      return { open: boolReducer(state.open, action) };

    default:
      return state;
  }
}
