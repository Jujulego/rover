import { Coords, realDistance } from '../Coords';

import DStarRover from './DStarRover';

// Class
class PathRover extends DStarRover {
  // Methods
  protected heuristic(from: Coords, to: Coords): number {
    return realDistance(from, to);
  }
}

export default PathRover;