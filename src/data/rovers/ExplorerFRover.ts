import Coords, { realDistance, direction, surrounding, distance } from 'data/Coords';
import Direction, { DMove } from 'data/Direction';
import Map from 'data/Map';

import FocusedDStarRover, { Node, UpdateList } from './bases/FocusedDStarRover';
import RoverAI from './bases/RoverAI';

// Constants
const COMPUTE_RANGE = 5 * Math.sqrt(50); // 5 cases (√50 is the length of a diagonal)

// Class
class ExplorerFRover extends FocusedDStarRover {
  // Constructor
  constructor(map: Map, pos: Coords, target: Coords) {
    super(map, pos, target, 10000);
  }

  // Methods
  protected isObstacle(p: Coords): boolean {
    const cached = this.getCachedCase(p);
    if (cached.floor) return cached.floor !== 'sand';

    return super.isObstacle(p);
  }

  protected shouldExpand(node: Node): boolean {
    const pt = realDistance(this.pos, this.target);
    const pnt = realDistance(this.pos, node.pos) + realDistance(node.pos, this.target);
    return Math.abs(pnt - pt) <= COMPUTE_RANGE;
  }

  protected heuristic(from: Coords, to: Coords): number {
    const d = realDistance(from, to);

    if (!this.getCachedCase(to).floor || distance(this.pos, to) <= 1) {
      return d / 2;
    }

    return d;
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

      if (this.getFloor(c) !== 'sand') {
        updates.obstacles(c);
      }
    });
  }

  restart(): RoverAI {
    return super.restart(true);
  }
}

export default ExplorerFRover;
