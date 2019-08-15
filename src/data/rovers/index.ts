import Coords from '../Coords';
import Map from '../Map';
import RoverAI from '../RoverAI';

import ChrystelleRover from './ChrystelleRover';
import EnergyRover from './EnergyRover';
import ExplorerRover from './ExplorerRover';
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
  PathRover,
  SimpleRover,
  StupidRover
}

export default creators;
