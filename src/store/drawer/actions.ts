import { boolActionCreator } from 'utils/actions/BoolAction';

import { DRAWER } from './constants';

// Actions
export const drawer = boolActionCreator(DRAWER, { true: 'open', false: 'close' });
