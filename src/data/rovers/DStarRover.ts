import { DIRECTIONS } from '../constants';
import { Coords, hash, surrounding } from '../Coords';
import { Map } from '../Map';
import { RoverAI } from '../RoverAI';

import CachedRover from './CachedRover';

// Types
type Data = { from: Coords | null, cost: number };

// Class
abstract class DStarRover extends CachedRover {
  // Attributes
  private readonly _size: Coords;
  private _data: { [name: string]: Data } = {};

  // Constructor
  constructor(map: Map, pos: Coords, target: Coords) {
    super(map, pos, target);

    this._size = map.size;
    this.init();
  }

  // Abstract methods
  protected abstract heuristic(p: Coords, base: number): number

  // Methods
  private init() {
    // Initiate data
    const queue = [{ cost: 0, pos: this.target }];
    this._data = {
      [hash(this.target)]: { from: this.target, cost: 0 }
    };

    while (queue.length !== 0) {
      // Take the first
      const d = queue.pop();
      if (d === undefined) break;
      const { cost, pos } = d;

      // Get surroundings
      DIRECTIONS.forEach((dir) => {
        const p = surrounding(pos, dir);
        
        // Check if in map
        if (p.x < 0 || p.x >= this._size.x) return;
        if (p.y < 0 || p.y >= this._size.y) return;

        // Check if not inserted
        if (this._data[hash(p)] === undefined) {
          const c = this.heuristic(p, cost);

          // Insert
          this._data[hash(p)] = { cost: c, from: pos };

          // Enqueue
          queue.unshift({ cost: c, pos: p });
        }
      });

      // Sort queue
      queue.sort((d1, d2) => d2.cost - d1.cost);
    }
  }
  
  protected compute(): Coords {
    const cases = DIRECTIONS.map(dir => surrounding(this.pos, dir));
    cases.sort((c1, c2) => this._data[hash(c1)].cost - this._data[hash(c2)].cost);
    
    return cases[0];
  }

  restart(): RoverAI {
    super.restart();
    this.init();

    return this;
  }
}

export default DStarRover;