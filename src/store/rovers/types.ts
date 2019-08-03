import { RoverColor } from 'assets/rovers';

import { Coords } from 'data/Coords';
import { RoverAI } from 'data/RoverAI';

import {
  ADD_ROVER,
  PLAY_ROVER,
  SET_ROVER_COLOR
} from './constants';

// Actions
type AddRoverAction = {
  type: typeof ADD_ROVER,
  name: string,
  data: RoverAI,
  color: RoverColor
}

type PlayRoverAction = {
  type: typeof PLAY_ROVER,
  name: string
}

type SetRoverColorAction = {
  type: typeof SET_ROVER_COLOR,
  name: string,
  color: RoverColor
}

export type RoverActionTypes = SetRoverColorAction | PlayRoverAction;
export type RoversActionTypes = AddRoverAction | RoverActionTypes;

// State type
export interface RoverState {
  data: RoverAI,
  color: RoverColor,
  track: Array<Coords>
}

export type RoversState = { [name: string]: RoverState }