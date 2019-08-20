import { OPEN, CLOSE, TOGGLE } from './constants';

// Actions types
interface SimpleAction<A> {
  type: A,
}

export type DrawerActionTypes = SimpleAction<typeof OPEN> | SimpleAction<typeof CLOSE> | SimpleAction<typeof TOGGLE>;

// State type
export interface DrawerState {
  open: boolean
}
