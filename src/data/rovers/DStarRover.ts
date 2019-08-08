import { DIRECTIONS } from '../constants';
import Coords, { equal, hash, surrounding } from '../Coords';
import Map from '../Map';
import RoverAI from '../RoverAI';

import CachedRover from './CachedRover';

// Types
type Data = { from: Coords | null, cost: number, obstacle?: boolean };
type Flag = 'UNREACHABLE' | 'UPDATED';

// Class
abstract class DStarRover extends CachedRover {
  // Inspired by https://fr.wikipedia.org/wiki/Algorithme_D*
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
  protected abstract heuristic(from: Coords, to: Coords): number

  // Methods
  private inMap(p: Coords): boolean {
    return (p.x >= 0 && p.x < this._size.x) && (p.y >= 0 && p.y < this._size.y);
  }

  getDStarData(p: Coords): Data {
    return this._data[hash(p)]
  }

  private surroundings(p: Coords): Array<Coords> {
    return DIRECTIONS.reduce(
      (acc, dir) => {
        const c = surrounding(p, dir);
        if (this.inMap(c)) acc.push(c);

        return acc;
      },
      new Array<Coords>()
    );
  }

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
      this.surroundings(pos).forEach((p) => {
        // Check if not inserted
        const c = cost + this.heuristic(pos, p);
        const data = this._data[hash(p)];

        if (!data || data.cost > c) {
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

  protected addObstacle(obs: Coords) {
    // Set obstacle
    this._data[hash(obs)].obstacle = true;

    // Update data
    const queue: Array<{ pos: Coords, flag: Flag }> = [{ pos: obs, flag: 'UNREACHABLE' }];
    while (queue.length > 0) {
      const d = queue.pop();
      if (d === undefined) break;
      const { flag, pos } = d;

      const data = this._data[hash(pos)];

      // Get surroundings
      this.surroundings(pos).forEach((p) => {
        const d = this._data[hash(p)];

        // Ignore if is obstacle
        if (d.obstacle) return;

        // Check if from is pos
        if (d.from) { // p reachable
          if (equal(d.from, pos)) { // p from pos
            if (flag === 'UNREACHABLE') { // pos unreachable
              // pos is unreachable so p should also be unreachable
              this._data[hash(p)].from = null;
              queue.unshift({ pos: p, flag: 'UNREACHABLE' });
            } else { // pos updated
              // pos is updated so p should be also be updated
              this._data[hash(p)].cost = data.cost + this.heuristic(pos, p);
              queue.unshift({ pos: p, flag: 'UPDATED' });
            }
          } else { // p not from pos
            if (flag === 'UNREACHABLE') { // pos is unreachable
              // Maybe can start updates from there
              queue.unshift({ pos: p, flag: 'UPDATED' });
            } else { // pos is updated
              // pos is updated so p can be also be updated
              const nc = data.cost + this.heuristic(pos, p);

              if (nc < d.cost) {
                this._data[hash(p)].cost = nc;
                this._data[hash(p)].from = pos;
                queue.unshift({ pos: p, flag: 'UPDATED' });
              }
            }
          }
        } else if (!d.obstacle) { // p is unreachable and not obstacle
          if (flag === 'UPDATED') { // pos updated
            // Update p
            this._data[hash(p)].cost = data.cost + this.heuristic(pos, p);
            this._data[hash(p)].from = pos;
            queue.unshift({ pos: p, flag: 'UPDATED' });
          }
        }
      });
    }
  }

  protected compute(): Coords {
    let i = 8;
    while (i) {
      const dp = this._data[hash(this.pos)];
      if (dp.from == null) return this.pos;

      const df = this._data[hash(dp.from)];

      // Check if known as an obstacle
      if (df.obstacle) return this.pos;

      // Check if there is an obstacle
      const floor = this.getFloor(dp.from); // cost 0.2 energy
      if (floor === 'hole') {
        // Update and recompute path
        this.addObstacle(dp.from);

        --i;
        continue;
      }

      return dp.from;
    }

    return this.pos;
  }

  restart(): RoverAI {
    super.restart();
    this.init();

    return this;
  }
}

export default DStarRover;
