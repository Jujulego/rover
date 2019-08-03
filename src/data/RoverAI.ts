import { Coords, distance, surrounding } from './Coords';
import { FloorType, Map } from './Map';

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
  // - utils
  protected slopeTo(p: Coords): number {
    const d = distance(this._pos, p);
    if (d === 0) return 0;

    // Energy cost
    this._energy -= .1 * (d - 1);

    return this.map.slope(this._pos, p);
  }
  protected floorType(p: Coords): FloorType {
    const d = distance(this._pos, p);

    // Energy cost
    if (d === 0) {
      this._energy -= .1;
    } else if (d === 1) {
      this._energy -= .2;
    } else {
      this._energy -= .4;
    }

    const c = this.map.get(p);
    return c ? c.floor : 'hole';
  }

  // - rules
  private energyCost(p: Coords): number {
    // Distance
    let r = (p.x === this._pos.x || p.y === this._pos.y) ? 1 : 1.4;

    // Slope
    const slope = this.map.slope(this._pos, p);
    r *= 1 + slope;

    // Sand
    const c = this.map.getOrDefault(p);
    if (c.floor === 'sand') {
      r += Math.sign(slope) * .1;
    }

    return r;
  }

  private moveTo(p: Coords) {
    this._energy -= this.energyCost(p);
    this._ppos = this._pos;
    this._pos = p;
  }

  play(): RoverAI {
    if (this._wait === 0) {
      const result = this.compute();

      // Out of range
      if (distance(this._pos, result) !== 1) {
        console.log('Invalid result !', result);
        return this;
      }

      // Slope too tricky
      const slope = this.map.slope(this._pos, result);
      if (Math.abs(slope) > 1.5) {
        console.log('Cannot climb !', result, '(slope =', slope, ')');
        this._wait = 10;
        return this;
      }

      // Move
      this.moveTo(result);

      // Not enough energy
      if (this._energy < 0) {
        console.log('Not enough energy', result);
        this._wait = 10;
        this._pos = this._ppos;
      } else {
        const c = this.map.get(result);

        // In a hole
        if (!c || c.floor === 'hole') {
          console.log('Felt in a hole', result);
          this._wait = 10;
        }

        // On ice
        if (c && c.floor === 'ice') {
          this._energy = 100;
        }

        // Out of energy
        if (this._energy === 0) {
          console.log('Out of energy', result);
          this._wait = 10;
        }
      }
    } else {
      --this._wait;

      if (this._wait === 0) {
        // Recover energy
        if (this._energy <= 0) {
          this._energy = 10;
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