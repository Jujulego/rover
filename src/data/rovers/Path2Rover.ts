import Coords, { realDistance } from '../Coords';

import DStar2Rover from './DStar2Rover';

// Class
class Path2Rover extends DStar2Rover {
  // Methods
  protected heuristic(from: Coords, to: Coords): number {
    return realDistance(from, to);
  }
}

export default Path2Rover;
