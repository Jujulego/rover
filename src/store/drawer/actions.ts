import { OPEN, CLOSE, TOGGLE } from './constants';
import { DrawerActionTypes } from './types';

// Actions
export const openDrawer = (): DrawerActionTypes => ({ type: OPEN });
export const closeDrawer = (): DrawerActionTypes => ({ type: CLOSE });
export const toggleDrawer = (): DrawerActionTypes => ({ type: TOGGLE });
