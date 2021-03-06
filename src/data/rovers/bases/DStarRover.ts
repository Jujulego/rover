import { Queue, measure } from 'utils';

import Coords, { equal, hash, surrounding, surroundings } from 'data/Coords';
import { MOVES } from 'data/Direction';
import Map from 'data/Map';

import CachedRover from './CachedRover';
import RoverAI from './RoverAI';
import TreeMixin, { TNode } from './TreeMixin';

// Types
type Flag = 'NEW' | 'RAISE' | 'LOWER';
type Flagged = { pos: Coords, flag: Flag };

type Data = {
  from: Coords | null,
  obstacle?: boolean,
  cost: number
};

// Utils
export class UpdateList {
  // Attributes
  private readonly list = new Array<Flagged>();

  private readonly inMap: (c: Coords) => boolean;
  private readonly onObstacle: (c: Coords[]) => void;

  // Constructor
  constructor(inMap: (c: Coords) => boolean, onObstacle: (c: Coords[]) => void) {
    this.inMap = inMap;
    this.onObstacle = onObstacle;
  }

  // Property
  get length() {
    return this.list.length;
  }

  // Methods
  forEach(cb: (value: Flagged) => void) {
    this.list.forEach(cb);
  }

  private add(flag: Flag, coords: Coords[]) {
    coords.forEach(pos => this.list.push({ pos, flag }));
  }

  obstacles(...coords: Coords[]) {
    const obstacles = coords.filter(this.inMap);

    this.onObstacle(obstacles);
    this.add('RAISE', obstacles);
  }

  raise(...coords: Coords[]) {
    this.add('RAISE', coords.filter(this.inMap));
  }

  lower(...coords: Coords[]) {
    this.add('LOWER', coords.filter(this.inMap));
  }
}

// Class
abstract class DStarRover extends CachedRover implements TreeMixin {
  // Inspired by https://fr.wikipedia.org/wiki/Algorithme_D*
  // Attributes
  private readonly _size: Coords;
  private _data: { [name: string]: Data } = {};
  private _tree_version: number = 0;

  // Constructor
  constructor(map: Map, pos: Coords, target: Coords, gaugeSize?: number) {
    super(map, pos, target, gaugeSize);

    this._size = map.size;
    this.init();
  }

  // Abstract methods
  protected abstract heuristic(from: Coords, to: Coords): number

  // Methods
  getDStarData(p: Coords): Data {
    return this._data[hash(p)]
  }

  // - tree
  treeVersion(): number {
    return this._tree_version;
  }

  getNode(pos: Coords): TNode | undefined {
    const d = this.getDStarData(pos);
    return { pos, ...d };
  }

  getChildren(node: TNode): Array<TNode> {
    return surroundings(node.pos).reduce((acc, p) => {
      const n = this.getNode(p);
      if (n && !n.obstacle && n.from && equal(node.pos, n.from)) {
        acc.push(n);
      }

      return acc;
    }, new Array<TNode>());
  }

  // - utils
  private surroundings(p: Coords): Array<Coords> {
    return MOVES.reduce(
      (acc, dir) => {
        const c = surrounding(p, dir);
        if (this.inMap(c)) acc.push(c);

        return acc;
      },
      new Array<Coords>()
    );
  }

  private createList(): UpdateList {
    return new UpdateList(
      (c) => this.inMap(c),
      (coords) => coords.forEach((obs) => {
        this._data[hash(obs)].obstacle = true;
      })
    )
  }

  protected raise(pos: Coords) {
    this.expand([{ pos, flag: 'RAISE' }])
  }

  // - algorithm
  @measure({ limit: 10 })
  private expand(updates: UpdateList | Flagged[]) {
    // Setup queue
    const queue = new Queue<Flagged>();
    updates.forEach(u => {
      if (this.inMap(u.pos)) {
        queue.enqueue(u);
      }
    });

    while (!queue.isEmpty) {
      // dequeue
      const flagged = queue.dequeue() as Flagged;
      while (queue.next) { // remove copies
        if (equal(queue.next.pos, flagged.pos) && queue.next.flag === flagged.flag) {
          queue.dequeue();
        } else {
          break;
        }
      }

      // expand to neighbors
      const { pos, flag } = flagged;
      const data = this._data[hash(pos)] as Data;
      //console.log(`from ${pos.x},${pos.y} (${flag})`);

      this.surroundings(pos).forEach(p => {
        const d = this._data[hash(p)];
        if (d && d.obstacle) return;

        let cost = data.cost + this.heuristic(pos, p);
        //console.log(`to ${p.x},${p.y} (${d ? d.cost : 'infinity'} => ${cost})`);

        switch (flag) {
          case 'NEW':
            if (!d) { // no data => new node
              //console.log(`new:   ${p.x},${p.y} (${cost})`);

              this._data[hash(p)] = { cost, from: pos };
              queue.enqueue({ pos: p, flag: 'NEW' });
            } else if (d.cost > cost) { // can reduce cost ?
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
              } else if (!d.obstacle && !data.obstacle) { // will lower from there
                const nc = d.cost + this.heuristic(p, pos);
                //console.log(`lower: ${pos.x},${pos.y} (infinite => ${nc} by ${p.x},${p.y})`);

                cost += nc - data.cost;
                this._data[hash(pos)].cost = nc;
                this._data[hash(pos)].from = p;

                queue.enqueue({ pos, flag: 'LOWER' });
              }
            } else {
              if (equal(d.from, pos)) { // path goes threw pos
                if (d.cost !== cost) {
                  //console.log(`raise: ${p.x},${p.y} (${d.cost} => ${cost})`);

                  // p should be raised too
                  this._data[hash(p)].cost = cost;
                  queue.enqueue({ pos: p, flag: 'RAISE' });
                }
              } else if (!d.obstacle) { // maybe can lower from there
                const nc = d.cost + this.heuristic(p, pos);

                if (data.cost > nc) {
                  //console.log(`lower: ${pos.x},${pos.y} (${data.cost} => ${nc} by ${p.x},${p.y})`);

                  cost += nc - data.cost;
                  this._data[hash(pos)].cost = nc;
                  this._data[hash(pos)].from = p;

                  queue.enqueue({pos, flag: 'LOWER'});
                }
              }
            }

            break;
        }
      });
    }

    ++this._tree_version;
  }

  // - callbacks
  private init() {
    this._data = {
      [hash(this.target)]: { from: this.target, cost: 0 }
    };

    this.expand([{ pos: this.target, flag: 'NEW' }]);
  }

  protected detect(updates: UpdateList, data: { from: Coords, cost: number }) {
    // Check if there is an obstacle
    const floor = this.getFloor(data.from); // cost 0.2 energy

    if (floor === 'hole') {
      updates.obstacles(data.from);
    }
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
      const updates = this.createList();
      this.detect(updates, { from: dp.from, cost: dp.cost });
      if (updates.length > 0) {
        this.expand(updates);

        --i;
        if (i !== 0) continue;
      }

      return dp.from;
    }
  }

  restart(keep: boolean = false): RoverAI {
    super.restart(keep);
    if (!keep) {
      this.init();
    } else {
      this.expand([{ pos: this.target, flag: 'RAISE' }])
    }

    return this;
  }
}

export default DStarRover;
