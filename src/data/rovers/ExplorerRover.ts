import Coords, { realDistance } from '../Coords';
import RoverAI from '../RoverAI';

import DStarRover from './DStarRover';

// Class
class ExplorerRover extends DStarRover {
  // Methods
  protected heuristic(from: Coords, to: Coords): number {
    const d = realDistance(from, to);

    if (!this.getCachedCase(to).floor) {
      return d / 2;
    }

    return d;
  }

  restart(): RoverAI {
    super.restart(true);
    this.raiseTarget();

    return this;
  }
}

export default ExplorerRover;
