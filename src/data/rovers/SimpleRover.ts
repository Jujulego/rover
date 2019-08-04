import { DIRECTIONS } from '../constants';
import { Coords, distance, surrounding } from '../Coords';
import { RoverAI } from '../RoverAI';

// Class
class SimpleRover extends RoverAI {
  // Methods
  protected compute(): Coords {
    const cases = DIRECTIONS.map(dir => surrounding(this.pos, dir));
    cases.sort((c1, c2) => distance(c1, this.target) - distance(c2, this.target));

    for (let i = 0; i < cases.length; ++i) {
      const floor = this.getFloor(cases[i]); // cost 0.2 energy
      if (floor !== 'hole') {
        return cases[i];
      }
    }

    return cases[0];
  }
}

export default SimpleRover;