import { Coords, surrounding } from './Coords';
import { Map } from './Map';

// Class
abstract class Rover {
  // Attributs
  private readonly map: Map;

  private _pos: Coords;
  private _energy: number = 100;

  // Property
  get pos(): Coords {
    return this._pos;
  }

  get energy(): number {
    return this._energy;
  }

  // Constructor
  protected constructor(map: Map, pos: Coords) {
    this.map = map;
    this._pos = pos;
  }

  // Abstract methods
  protected abstract compute(): Coords;

  // Methods
  private moveTo(p: Coords) {
    this._pos = p;
  }

  play() {
    this.moveTo(surrounding(this.pos, 'right'));
  }
}

export default Rover;