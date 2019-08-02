import { RoverColor } from 'assets/rovers';
import { RoverAI } from 'data/RoverAI';

import {
  ADD_ROVER,
  SET_ROVER_COLOR
} from './constants';

// Actions
type AddRoverAction = {
  type: typeof ADD_ROVER,
  name: string,
  data: RoverAI,
  color: RoverColor
}

type SetRoverColorAction = {
  type: typeof SET_ROVER_COLOR,
  name: string,
  color: RoverColor
}

export type RoverActionTypes = SetRoverColorAction;
export type RoversActionTypes = AddRoverAction | RoverActionTypes;

// State type
export interface RoverState {
  data: RoverAI,
  color: RoverColor
}