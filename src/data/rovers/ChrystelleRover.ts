import Coords from 'data/Coords';

import RoverAI from './bases/RoverAI';

// Class
class ChrystelleRover extends RoverAI {
  // Methods
  protected compute(): Coords {
    const road = this.shortestRoad(this.pos, this.target);
    return road[0];
  }

  protected shortestRoad(start: Coords, end: Coords): Array<Coords> {
    let road: Array<Coords> = [];
    let { x, y } = start;

    const dx = end.x - x;
    const dy = end.y - y;

    if (Math.abs(dx) >= Math.abs(dy)) {
      let e = Math.abs(dx) - 2 * Math.abs(dy);

      while (x !== end.x) {
        road.push({ x, y });
        x += Math.sign(dx);

        if (e > 0) {
          e -= 2 * Math.abs(dy);
        } else {
          y += Math.sign(dy);
          e += 2 * (Math.abs(dx) - Math.abs(dy));
        }
      }
    } else {
      let e = Math.abs(dy) - 2 * Math.abs(dx);

      while (y !== end.y) {
        road.push({ x, y });
        y += Math.sign(dy);

        if (e > 0) {
          e -= 2 * Math.abs(dx);
        } else {
          x += Math.sign(dx);
          e += 2 * (Math.abs(dy) - Math.abs(dx));
        }
      }
    }

    road = road.slice(1);
    road.push(end);

    return road;
  }
}

export default ChrystelleRover;
