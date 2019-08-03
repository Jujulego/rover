import { Coords, surrounding } from './Coords';
import { Map } from './Map';

// Class
export abstract class RoverAI {
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
  constructor(map: Map, pos: Coords) {
    this.map = map;
    this._pos = pos;
  }

  // Abstract methods
  protected abstract compute(): Coords;

  // Methods
  private moveTo(p: Coords) {
    this._pos = p;
    --this._energy;
  }

  play(): RoverAI {
    this.moveTo(this.compute());

    return this;
  }
}