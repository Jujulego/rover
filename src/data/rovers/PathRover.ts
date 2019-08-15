import Coords, { realDistance } from 'data/Coords';

import DStarRover from './bases/DStarRover';

// Class
class PathRover extends DStarRover {
  // Methods
  protected heuristic(from: Coords, to: Coords): number {
    return realDistance(from, to);
  }
}

export default PathRover;
