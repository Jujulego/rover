import Coords from 'data/Coords';

import RoverAI from './RoverAI';

// Interface
export default interface CostMixin extends RoverAI {
  // Methods
  getCost(pos: Coords): number;
}

// Utils
export function hasCost(rover: RoverAI): rover is CostMixin {
  return 'getCost' in rover;
}