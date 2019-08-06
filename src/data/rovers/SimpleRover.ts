import { DIRECTIONS } from '../constants';
import { Coords, distance, surrounding } from '../Coords';

import { CachedRover } from './CachedRover';

// Class
class SimpleRover extends CachedRover {
  // Methods
  protected compute(): Coords {
    const cases = DIRECTIONS.map(dir => surrounding(this.pos, dir));
    cases.sort((c1, c2) => distance(c1, this.target) - distance(c2, this.target));

    for (let i = 0; i < cases.length; ++i) {
      const floor = this.getFloor(cases[i]); // cost 0.2 energy
      if (floor === 'hole') continue;

      const slope = this.getSlope(this.pos, cases[i]);
      if (Math.abs(slope) >= 1.5) continue;

      return cases[i];
    }

    return cases[0];
  }
}

export default SimpleRover;
