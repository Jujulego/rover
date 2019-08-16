import Coords, { direction, surrounding } from 'data/Coords';
import Direction, { DMove } from 'data/Direction';

import DStar2Rover, { UpdateList } from './bases/DStar2Rover';

// Constants
const TURN_COST = .6; // each turn uses .6 energy for detection
const DEFAULT_SLOPE = 0; // 0%
const ICE_BONUS = .5; // must be lower than TURN_COST
const SLOPE_MALUS = 100;

// Class
class EnergyRover extends DStar2Rover {
  // Methods
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

export default EnergyRover;
