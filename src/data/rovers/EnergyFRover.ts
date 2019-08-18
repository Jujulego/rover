import Coords, { direction, realDistance, sight } from 'data/Coords';
import { DMove } from 'data/Direction';

import FocusedDStarRover, { Node, UpdateList } from 'data/rovers/bases/FocusedDStarRover';

// Constants
const TURN_COST = .6; // each turn uses .6 energy for detection
const DEFAULT_SLOPE = 0; // 0%
const ICE_BONUS = .5; // must be lower than TURN_COST
const SLOPE_MALUS = 100;
const COMPUTE_RANGE = 5 * Math.sqrt(50); // 5 cases (√50 is the length of a diagonal)
const SIGHT_WIDTH = 3;
const SIGHT_DEPTH = 1;

// Class
class EnergyFRover extends FocusedDStarRover {
  // Methods
  protected shouldExpand(node: Node): boolean {
    const pt = realDistance(this.pos, this.target);
    const pnt = realDistance(this.pos, node.pos) + realDistance(node.pos, this.target);
    return Math.abs(pnt - pt) <= COMPUTE_RANGE;
  }

  protected heuristic(from: Coords, to: Coords): number {
    // Distance
    let r = (from.x === to.x || from.y === to.y) ? 1 : 1.4;

    // Slope
    const slope = this.getCachedSlope(from, to) || DEFAULT_SLOPE;
    r *= 1 + slope;

    if (Math.abs(slope) > 1.5) {
      r += SLOPE_MALUS;
    }

    // Sand
    const c = this.getCachedCase(to);
    switch (c.floor) {
      case 'sand':
        r += Math.sign(slope) * .1;
        break;

      case 'ice':
        if (Math.abs(slope) <= 1.5) {
          r = -ICE_BONUS;
        }
        break;
    }

    return r + TURN_COST;
  }

  protected detect(updates: UpdateList, data: { from: Coords; cost: number }) {
    // Look forward for obstacles
    sight(this.pos, direction(this.pos, data.from) as DMove, SIGHT_WIDTH, SIGHT_DEPTH).forEach(c => {
      switch (this.getFloor(c)) {
        case 'hole':
          updates.obstacles(c);
          break;

        case 'ice':
          updates.update(this.pos);
          break;

        case 'rock':
        case 'sand':
          if (this.getSlope(this.pos, c) !== 0) {
            updates.update(this.pos);
          }

          break;
      }
    });
  }
}

export default EnergyFRover;
