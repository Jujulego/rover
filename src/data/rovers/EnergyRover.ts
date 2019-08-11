import { Direction } from 'data/constants';
import Coords, { direction, surrounding } from '../Coords';

import DStarRover, { UpdateList } from './DStarRover';
import RoverAI from 'data/RoverAI';

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

  private getDirs(to: Coords): Array<Direction> {
    const dir = direction(this.pos, to) as Direction;
    switch (dir) {
      case 'top':         return ['topLeft', dir, 'topRight'];
      case 'topRight':    return ['top', dir, 'right'];
      case 'right':       return ['topRight', dir, 'bottomRight'];
      case 'bottomRight': return ['right', dir, 'bottom'];
      case 'bottom':      return ['bottomRight', dir, 'bottomLeft'];
      case 'bottomLeft':  return ['bottom', dir, 'left'];
      case 'left':        return ['bottomLeft', dir, 'topLeft'];
      case 'topLeft':     return ['left', dir, 'top'];
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
          const d = this.getDStarData(c);
          if (d.from) {
            updates.lower(d.from);
          }

          break;

        case 'sand':
          //updates.raise(c);
          break;
      }
    });
  }

  restart(): RoverAI {
    super.restart(true);
    this.raise(this.target);

    return this;
  }
}

export default EnergyRover;
