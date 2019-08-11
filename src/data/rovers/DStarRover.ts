import Queue from 'utils/Queue';

import { DIRECTIONS } from '../constants';
import Coords, { equal, hash, surrounding } from '../Coords';
import Map from '../Map';
import RoverAI from '../RoverAI';

import CachedRover from './CachedRover';

// Types
type Flag = 'NEW' | 'RAISE' | 'LOWER';
type Flagged = { pos: Coords, flag: Flag };

type Data = { from: Coords | null, cost: number, obstacle?: boolean };

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

  private expand(...updates: Flagged[]) {
    // Setup queue
    const queue = new Queue<Flagged>();
    updates.forEach(u => queue.enqueue(u));

    while (!queue.isEmpty) {
      // dequeue
      const flagged = queue.dequeue() as Flagged;

      // expand to neighbors
      const { pos, flag } = flagged;
      const data = this._data[hash(pos)] as Data;

      this.surroundings(pos).forEach(p => {
        const d = this._data[hash(p)];
        if (d && d.obstacle) return;

        const cost = data.cost + this.heuristic(pos, p);

        switch (flag) {
          case 'NEW':
            if (!d) { // no data => new node
              //console.log(`new:   ${p.x},${p.y} (${cost})`);

              this._data[hash(p)] = { cost, from: pos };
              queue.enqueue({ pos: p, flag: 'NEW' });
            } else if (d.cost > cost) { // can reduce cost
              //console.log(`lower: ${p.x},${p.y} (${d.cost} => ${cost} by ${pos.x},${pos.y})`);

              this._data[hash(p)].cost = cost;
              this._data[hash(p)].from = pos;
              queue.enqueue({ pos: p, flag: 'LOWER' });
            }

            break;

          case 'LOWER':
            if (!d) break; // should not happen

            if (!d.from || d.cost > cost) {
              //console.log(`lower: ${p.x},${p.y} (${d.from ? d.cost : 'infinite'} => ${cost} by ${pos.x},${pos.y})`);

              this._data[hash(p)].cost = cost;
              this._data[hash(p)].from = pos;
              queue.enqueue({ pos: p, flag: 'LOWER' });
            }

            break;

          case 'RAISE':
            if (!d) break; // should not happen
            if (!d.from) break;

            if (data.obstacle || !data.from) { // pos became unreachable
              if (equal(d.from, pos)) { // path goes threw pos
                //console.log(`raise: ${p.x},${p.y} (${d.cost} => infinite)`);

                // p should be unreachable too
                this._data[hash(p)].from = null;
                queue.enqueue({ pos: p, flag: 'RAISE' });
              } else if (!d.obstacle && (data.obstacle || d.cost <= data.cost)) { // maybe can lower from there (if reachable)
                //console.log(`lower: ${p.x},${p.y} (start lowering)`);

                queue.enqueue({ pos: p, flag: 'LOWER' });
              }
            } else {
              if (equal(d.from, pos)) { // path goes threw pos
                if (d.cost !== cost) {
                  //console.log(`raise: ${p.x},${p.y} (${d.cost} => ${cost})`);

                  // p should be raised too
                  this._data[hash(p)].cost = cost;
                  queue.enqueue({ pos: p, flag: 'RAISE' });
                }
              } else if (!d.obstacle && d.cost <= data.cost) { // maybe can lower from there (if reachable)
                //console.log(`lower: ${p.x},${p.y} (start lowering)`);

                queue.enqueue({ pos: p, flag: 'LOWER' });
              }
            }

            break;
        }
      });
    }
  }

  private init() {
    this._data = {
      [hash(this.target)]: { from: this.target, cost: 0 }
    };

    this.expand({ pos: this.target, flag: 'NEW' });
  }

  protected addObstacles(...obstacles: Coords[]) {
    // Set obstacles
    const updates = obstacles.reduce((acc, obs) => {
      if (this.inMap(obs)) {
        this._data[hash(obs)].obstacle = true;
        acc.push({ pos: obs, flag: 'RAISE' });
      }

      return acc;
    }, new Array<Flagged>());

    // Update path
    this.expand(...updates);
  }

  protected raise(...coords: Coords[]) {
    // Set obstacles
    const updates = coords.reduce((acc, c) => {
      if (this.inMap(c)) {
        acc.push({ pos: c, flag: 'RAISE' });
      }

      return acc;
    }, new Array<Flagged>());

    // Update path
    this.expand(...updates);
  }

  protected detect(data: { from: Coords, cost: number }): boolean {
    // Check if there is an obstacle
    const floor = this.getFloor(data.from); // cost 0.2 energy
    if (floor === 'hole') {
      // Update and recompute path
      this.addObstacles(data.from);

      return true;
    }

    return false;
  }

  protected compute(): Coords {
    let i = 8;
    while (true) {
      const dp = this._data[hash(this.pos)];
      if (dp.from == null) return this.pos;

      const df = this._data[hash(dp.from)];

      // Check if known as an obstacle
      if (df.obstacle) return this.pos;

      // Check if there is an obstacle
      if (this.detect({ from: dp.from, cost: dp.cost })) {
        --i;

        if (i !== 0) continue;
      }

      return dp.from;
    }
  }

  restart(keep: boolean = false): RoverAI {
    super.restart(keep);
    if (!keep) this.init();

    return this;
  }
}

export default DStarRover;
