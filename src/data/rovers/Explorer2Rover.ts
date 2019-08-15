import Direction from '../Direction';
import Coords, { realDistance, direction, surrounding } from '../Coords';
import RoverAI from '../RoverAI';

import DStar2Rover, { UpdateList } from './DStar2Rover';
import Map from 'data/Map';
import { DMove } from 'data/Direction';

// Class
class ExplorerRover extends DStar2Rover {
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

  protected preCompute(updates: UpdateList) {
    this.getFloor(this.pos); // cost 0.1 energy (only on the 1st play)
    updates.update(this.pos);
  }

  restart(): RoverAI {
    return super.restart(true);
  }
}

export default ExplorerRover;
