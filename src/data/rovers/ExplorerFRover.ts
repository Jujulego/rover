import Coords, { realDistance, direction, distance, sight } from 'data/Coords';
import { DMove } from 'data/Direction';
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

  protected detect(updates: UpdateList, data: { from: Coords; cost: number }) {
    // Look forward for obstacles
    sight(this.pos, direction(this.pos, data.from) as DMove, 3, 1).forEach(c => {
      if (!this.inMap(c)) return;

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
