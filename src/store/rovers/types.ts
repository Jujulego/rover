import { RoverColor } from 'assets/rovers';

import Coords from 'data/Coords';
import RoverAI from 'data/RoverAI';

import {
  ADD_ROVER, CLEAR_ROVERS,
  PLAY_ROVER, START_ROVER, STOP_ROVER, RESTART_ROVER, SET_ROVER_COLOR
} from './constants';

// Actions
type AddRoverAction = {
  type: typeof ADD_ROVER,
  name: string,
  data: RoverAI,
  color: RoverColor
}

type ClearRoversAction = {
  type: typeof CLEAR_ROVERS
}

type SimpleRoverAction = {
  type: typeof PLAY_ROVER | typeof START_ROVER | typeof STOP_ROVER | typeof RESTART_ROVER,
  name: string
}

type SetRoverColorAction = {
  type: typeof SET_ROVER_COLOR,
  name: string,
  color: RoverColor
}

export type RoverActionTypes = SimpleRoverAction | SetRoverColorAction;
export type RoversActionTypes = AddRoverAction | ClearRoversAction | RoverActionTypes;

// State type
export interface RoverState {
  data: RoverAI,
  color: RoverColor,
  track: Array<Coords>,
  active: boolean
}

export type RoversState = { [name: string]: RoverState }
