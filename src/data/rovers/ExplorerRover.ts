import Coords, { realDistance, direction, sight } from 'data/Coords';
import { DMove } from 'data/Direction';
import Map from 'data/Map';

import DStarRover, { UpdateList } from './bases/DStarRover';
import RoverAI from './bases/RoverAI';

// Class
class ExplorerRover extends DStarRover {
  // Constructor
  constructor(map: Map, pos: Coords, target: Coords) {
    super(map, pos, target, 10000);
  }

  // Methods
  protected heuristic(from: Coords, to: Coords): number {
    const d = realDistance(from, to);

    if (!this.getCachedCase(to).floor) {
      return d / 2;
    }

    return d;
  }

  protected detect(updates: UpdateList, data: { from: Coords; cost: number }) {
    // Look forward for obstacles
    sight(this.pos, direction(this.pos, data.from) as DMove, 3, 1).forEach(c => {
      if (this.getFloor(c) !== 'sand') {
        updates.obstacles(c);
      }
    });
  }

  protected compute(): Coords {
    this.getFloor(this.pos); // cost 0.1 energy (only on the 1st play)
    this.raise(this.pos);

    return super.compute();
  }

  restart(): RoverAI {
    return super.restart(true);
  }
}

export default ExplorerRover;
