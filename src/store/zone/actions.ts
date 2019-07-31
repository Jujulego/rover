import { Coords } from 'data/Coords';
import { ZoneOptions } from 'components/map/Zone';

import { TOGGLE_OPTION, MOVE_ZONE } from './constants';
import { ZoneActionTypes } from './types';

// Actions
export const toggleOption = (name: ZoneOptions): ZoneActionTypes => ({ type: TOGGLE_OPTION, name });

export const moveZone = (center: Coords): ZoneActionTypes => ({ type: MOVE_ZONE, center });