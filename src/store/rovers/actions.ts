import { RoverColor } from 'assets/rovers';
import { RoverAI } from 'data/RoverAI';

import { ADD_ROVER } from './constants';
import { RoversActionTypes } from './types';

// Actions
export const addRover = (name: string, data: RoverAI, color: RoverColor = 'blue'): RoversActionTypes => ({
  type: ADD_ROVER, name, data, color
});