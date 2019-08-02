import { RoverColor } from 'assets/rovers';
import { RoverAI } from 'data/RoverAI';

import { ADD_ROVER } from './constants';

// Actions
type AddRoverAction = {
  type: typeof ADD_ROVER,
  name: string,
  data: RoverAI,
  color: RoverColor
}

export type RoversActionTypes = AddRoverAction;

// State type
export interface RoverState {
  data: RoverAI,
  color: RoverColor
}