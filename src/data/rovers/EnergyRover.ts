import Direction, { DMove } from '../Direction';
import Coords, { direction, surrounding } from '../Coords';

import DStarRover, { UpdateList } from './DStarRover';

// Constants
const TURN_COST = 100;
const DEFAULT_SLOPE = 0; // 0%

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

  private getDirs(to: Coords): Array<DMove> {
    const dir = direction(this.pos, to) as DMove;
    switch (dir) {
      case Direction.T:   return [Direction.TRA, dir, Direction.TLA];
      case Direction.TLA: return [Direction.T,   dir, Direction.L];
      case Direction.L:   return [Direction.TLA, dir, Direction.BLA];
      case Direction.BLA: return [Direction.L,   dir, Direction.B];
      case Direction.B:   return [Direction.BLA, dir, Direction.BRA];
      case Direction.BRA: return [Direction.B,   dir, Direction.R];
      case Direction.R:   return [Direction.BRA, dir, Direction.TRA];
      case Direction.TRA: return [Direction.R,   dir, Direction.T];
    }
  }

  protected detect(updates: UpdateList, data: { from: Coords; cost: number }) {
    // Look forward for obstacles
    const dirs = this.getDirs(data.from);
    dirs.forEach(dir => {
      const c = surrounding(this.pos, dir);
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
