import Coords from 'data/Coords';
import Map from 'data/Map';

import RoverAI from './bases/RoverAI';

import ChrystelleRover from './ChrystelleRover';
import EnergyRover from './EnergyRover';
import ExplorerRover from './ExplorerRover';
import Explorer2Rover from './Explorer2Rover';
import PathRover from './PathRover';
import Path2Rover from './Path2Rover';
import SimpleRover from './SimpleRover';
import StupidRover from './StupidRover';

// Types
type AI = { new(map: Map, start: Coords, target: Coords): RoverAI };

// Creators
const creators: { [name: string]: AI } = {
  'chrystelle': ChrystelleRover,
  'energy': EnergyRover,
  'explorer': ExplorerRover,
  'explorer2': Explorer2Rover,
  'path': PathRover,
  'path2': Path2Rover,
  'simple': SimpleRover,
  'stupid': StupidRover
};

// Exports
export {
  ChrystelleRover,
  EnergyRover,
  ExplorerRover,
  Explorer2Rover,
  PathRover,
  Path2Rover,
  SimpleRover,
  StupidRover
}

export default creators;
