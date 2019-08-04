import { RoverColor } from 'assets/rovers';
import { RoverAI } from 'data/RoverAI';

import {
  ADD_ROVER,
  PLAY_ROVER,
  SET_ROVER_COLOR
} from './constants';
import { RoverActionTypes, RoversActionTypes } from './types';

// Actions
export const addRover = (name: string, data: RoverAI, color: RoverColor): RoversActionTypes => ({
  type: ADD_ROVER, name, data, color
});

export const playRover = (name: string): RoverActionTypes => ({ type: PLAY_ROVER, name });
export const setRoverColor = (name: string, color: RoverColor): RoverActionTypes => ({
  type: SET_ROVER_COLOR, name, color
});