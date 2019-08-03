import { Coords, surrounding } from './Coords';
import { Map } from './Map';

// Class
export abstract class RoverAI {
  // Attributs
  private readonly map: Map;

  private _pos: Coords;
  private _ppos: Coords;
  private _wait: number = 0;
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
    this._ppos = pos;
  }

  // Abstract methods
  protected abstract compute(): Coords;

  // Methods
  protected energyCost(p: Coords): number {
    const e = (p.x === this._pos.x || p.y === this._pos.y) ? 1 : 1.4;
    const slope = this.map.slope(this._pos, p);

    return e * (1 + slope);
  }

  private moveTo(p: Coords) {
    this._energy -= this.energyCost(p);
    this._pos = p;
  }

  play(): RoverAI {
    if (this._wait === 0) {
      const result = this.compute();

      this._ppos = this._pos;
      this.moveTo(result);

      const c = this.map.get(result);

      // Not enough energy
      if (this._energy < 0) {
        this._wait = 10;
        this._pos = this._ppos;
      } else {
        // In a hole
        if (!c || c.floor === 'hole') {
          this._wait = 10;
        }

        // On ice
        if (c && c.floor === 'ice') {
          this._energy = 100;
        }

        // Out of energy
        if (this._energy === 0) {
          this._wait = 10;
        }
      }
    } else {
      --this._wait;

      if (this._wait === 0) {
        // Recover energy
        if (this._energy <= 0) {
          this._energy = 100;
        }

        // Get out of the hole
        const pc = this.map.get(this._pos);
        if (!pc || pc.floor === 'hole') {
          this._pos = this._ppos;
        }
      }
    }

    return this;
  }
}