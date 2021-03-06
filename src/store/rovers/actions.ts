import { RoverColor } from 'assets/rovers';
import RoverAI from 'data/rovers/bases/RoverAI';

import {
  ADD_ROVER, CLEAR_ROVERS,
  PLAY_ROVER, START_ROVER, STOP_ROVER, RESTART_ROVER, SET_ROVER_COLOR
} from './constants';
import { RoverActionTypes, RoversActionTypes } from './types';

// Actions
export const addRover = (name: string, data: RoverAI, color: RoverColor): RoversActionTypes => ({
  type: ADD_ROVER, name, data, color
});

export const clearRovers = (): RoversActionTypes => ({ type: CLEAR_ROVERS });

export const playRover = (name: string): RoverActionTypes => ({ type: PLAY_ROVER, name });
export const startRover = (name: string): RoverActionTypes => ({ type: START_ROVER, name });
export const stopRover = (name: string): RoverActionTypes => ({ type: STOP_ROVER, name });
export const restartRover = (name: string): RoverActionTypes => ({ type: RESTART_ROVER, name });
export const setRoverColor = (name: string, color: RoverColor): RoverActionTypes => ({
  type: SET_ROVER_COLOR, name, color
});
