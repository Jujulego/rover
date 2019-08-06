import { Coords, realDistance } from '../Coords';

import DStarRover from './DStarRover';

// Class
class PathRover extends DStarRover {
  // Methods
  protected heuristic(p: Coords, base: number): number {
    return realDistance(p, this.target);
  }
}

export default PathRover;