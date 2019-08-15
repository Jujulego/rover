import Coords, { realDistance, surrounding } from 'data/Coords';
import { MOVES } from 'data/Direction';

import CachedRover from './bases/CachedRover';

// Class
class SimpleRover extends CachedRover {
  // Methods
  protected compute(): Coords {
    const cases = MOVES.map(dir => surrounding(this.pos, dir));
    cases.sort((c1, c2) => realDistance(c1, this.target) - realDistance(c2, this.target));

    for (let i = 0; i < cases.length; ++i) {
      const slope = this.getSlope(this.pos, cases[i]);
      if (Math.abs(slope) >= 1.5) continue;

      const floor = this.getFloor(cases[i]); // cost 0.2 energy
      if (floor === 'hole') continue;

      return cases[i];
    }

    return cases[0];
  }
}

export default SimpleRover;
