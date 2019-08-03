import { RoverAI } from '../RoverAI';
import { Coords, surrounding } from '../Coords';

// Class
class StupidRover extends RoverAI {
  // Methods
  protected compute(): Coords {
    return surrounding(this.pos, 'right');
  }
}

export default StupidRover;