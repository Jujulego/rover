import { BoolAction } from 'utils/actions/BoolAction';

import { DRAWER } from './constants';

// Actions types
export type DrawerActionTypes = BoolAction<typeof DRAWER>;

// State type
export interface DrawerState {
  open: boolean
}
