import Direction, { DMove } from 'data/Direction';
import Coords, { surrounding } from '../Coords';
import Map from '../Map';
import RoverAI from '../RoverAI';

// Class
class StupidRover extends RoverAI {
  readonly direction: DMove;

  // Constructor
  constructor(map: Map, pos: Coords, target: Coords, direction: DMove = Direction.R) {
    super(map, pos, target);

    this.direction = direction;
  }

  // Methods
  protected compute(): Coords {
    return surrounding(this.pos, this.direction);
  }
}

export default StupidRover;
