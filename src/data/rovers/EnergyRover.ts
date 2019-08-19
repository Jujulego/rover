import Coords, { direction, sight } from 'data/Coords';
import { DMove } from 'data/Direction';

import DStarRover, { UpdateList } from './bases/DStarRover';

// Constants
const TURN_COST = 100;
const DEFAULT_SLOPE = 0; // 0%
const SIGHT_WIDTH = 3;
const SIGHT_DEPTH = 1;

// Class
class EnergyRover extends DStarRover {
  // Methods
  protected heuristic(from: Coords, to: Coords): number {
    // Distance
    let r = (from.x === to.x || from.y === to.y) ? 1 : 1.4;

    // Slope
    const slope = this.getCachedSlope(from, to) || DEFAULT_SLOPE;
    r *= 1 + slope;

    if (Math.abs(slope) > 1.5) {
      r += 10 * TURN_COST;
    }

    // Sand
    const c = this.getCachedCase(to);
    switch (c.floor) {
      case 'sand':
        r += Math.sign(slope) * .1;
        break;

      case 'ice':
        if (Math.abs(slope) <= 1.5) {
          r = -TURN_COST;
        }
        break;
    }

    return r + TURN_COST;
  }

  protected detect(updates: UpdateList, data: { from: Coords; cost: number }) {
    // Look forward for obstacles
    sight(this.pos, direction(this.pos, data.from) as DMove, SIGHT_WIDTH, SIGHT_DEPTH).forEach(c => {
      const cached = this.getCachedCase(c);
      const data = this.getDStarData(c);

      switch (this.getFloor(c)) {
        case 'hole':
          if (data && !data.obstacle) updates.obstacles(c);
          break;

        case 'ice':
          if (data && data.from && cached.floor !== 'ice') {
            updates.lower(data.from);
          }

          break;

        case 'sand':
          //updates.raise(c);
          break;
      }
    });
  }
}

export default EnergyRover;
