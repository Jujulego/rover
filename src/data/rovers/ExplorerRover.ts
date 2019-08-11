import { Direction } from 'data/constants';
import Coords, { realDistance, direction, surrounding } from '../Coords';
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

  protected detect(data: { from: Coords; cost: number }): boolean {
    // Look forward for obstacles
    const dirs = this.getDirs(data.from);
    const obs = dirs.reduce((acc, dir) => {
      const c = surrounding(this.pos, dir);
      const f = this.getFloor(c);

      if (f !== 'sand') {
        acc.push(c);
      }

      return acc;
    }, new Array<Coords>());

    // Recompute path if needed
    if (obs.length > 0) {
      this.addObstacles(...obs);
      return true;
    }

    return false;
  }

  protected compute(): Coords {
    this.getFloor(this.pos); // cost 0.1 energy (only on the 1st play)
    this.raise(this.pos);

    return super.compute();
  }

  restart(): RoverAI {
    super.restart(true);
    this.raise(this.target);

    return this;
  }
}

export default ExplorerRover;
