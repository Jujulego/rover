import Coords, { distance, equal } from './Coords';
import Map, { FloorType } from './Map';

// Class
abstract class RoverAI {
  // Attributs
  readonly start: Coords;
  readonly target: Coords;
  readonly gaugeSize: number;

  private readonly map: Map;

  private _pos: Coords;
  private _ppos: Coords;
  private _wait: number = 0;
  private _energy: number;

  // Property
  get pos(): Coords {
    return this._pos;
  }

  get energy(): number {
    return this._energy;
  }

  get wait(): number {
    return this._wait;
  }

  get arrived(): boolean {
    return equal(this.pos, this.target);
  }

  // Constructor
  constructor(map: Map, pos: Coords, target: Coords, gaugeSize: number = 100) {
    this.start = pos;
    this.target = target;
    this.gaugeSize = gaugeSize;

    this.map = map;
    this._pos = pos;
    this._ppos = pos;
    this._energy = gaugeSize;
  }

  // Abstract methods
  protected abstract compute(): Coords;

  // Methods
  // - utils
  protected getSlope(c1: Coords, c2: Coords): number {
    const d = Math.min(distance(this._pos, c1), distance(this._pos, c2));

    // Energy cost
    this._energy -= .1 * d;

    return this.map.slope(c1, c2);
  }
  protected getFloor(p: Coords): FloorType {
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

  protected inMap(p: Coords): boolean {
    return !this.map.isOut(p);
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

      // Out of range / stay
      const d = distance(this._pos, result);
      if (d !== 1) {
        if (d > 1) console.log('Invalid result !', result);
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
          this._energy = this.gaugeSize;
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

  restart(): RoverAI {
    this._pos = this.start;
    this._ppos = this.start;
    this._energy = this.gaugeSize;
    this._wait = 0;

    return this;
  }
}

export default RoverAI;
