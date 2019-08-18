import Coords from 'data/Coords';
import Map from 'data/Map';

import RoverAI from './bases/RoverAI';

import ChrystelleRover from './ChrystelleRover';
import EnergyRover from './EnergyRover';
import EnergyFRover from 'data/rovers/EnergyFRover';
import ExplorerRover from './ExplorerRover';
import ExplorerFRover from './ExplorerFRover';
import PathRover from './PathRover';
import SimpleRover from './SimpleRover';
import StupidRover from './StupidRover';

// Types
type AI = { new(map: Map, start: Coords, target: Coords): RoverAI };

// Creators
const creators: { [name: string]: AI } = {
  'chrystelle': ChrystelleRover,
  'energy': EnergyRover,
  'energyf': EnergyFRover,
  'explorer': ExplorerRover,
  'explorerf': ExplorerFRover,
  'path': PathRover,
  'simple': SimpleRover,
  'stupid': StupidRover
};

// Exports
export {
  ChrystelleRover,
  EnergyRover,
  EnergyFRover,
  ExplorerRover,
  ExplorerFRover,
  PathRover,
  SimpleRover,
  StupidRover
}

export default creators;
