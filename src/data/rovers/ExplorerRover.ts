import { Direction } from 'data/constants';
import Coords, { realDistance, direction, surrounding } from '../Coords';
import RoverAI from '../RoverAI';

import DStarRover, { UpdateList } from './DStarRover';
import Map from 'data/Map';

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
    super.restart(true);
    this.raise(this.target);

    return this;
  }
}

export default ExplorerRover;
