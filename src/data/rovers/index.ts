import Coords from '../Coords';
import Map from '../Map';
import RoverAI from '../RoverAI';

import ChrystelleRover from './ChrystelleRover';
import ExplorerRover from 'data/rovers/ExplorerRover';
import PathRover from './PathRover';
import SimpleRover from './SimpleRover';
import StupidRover from './StupidRover';

// Types
type AI = { new(map: Map, start: Coords, target: Coords): RoverAI };

// Creators
const creators: { [name: string]: AI } = {
  'chrystelle': ChrystelleRover,
  'explorer': ExplorerRover,
  'path': PathRover,
  'simple': SimpleRover,
  'stupid': StupidRover
};

// Exports
export {
  ChrystelleRover,
  ExplorerRover,
  PathRover,
  SimpleRover,
  StupidRover
}

export default creators;
