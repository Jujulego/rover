import Coords from '../Coords';
import Map from '../Map';
import RoverAI from '../RoverAI';

import ChristelleRover from './ChristelleRover';
import PathRover from './PathRover';
import SimpleRover from './SimpleRover';
import StupidRover from './StupidRover';

// Types
type AI = { new(map: Map, start: Coords, target: Coords): RoverAI };

// Creators
const creators: { [name: string]: AI } = {
  'chrystelle': ChristelleRover,
  'path': PathRover,
  'simple': SimpleRover,
  'stupid': StupidRover
};

// Exports
export {
  ChristelleRover,
  PathRover,
  SimpleRover,
  StupidRover
}

export default creators;
