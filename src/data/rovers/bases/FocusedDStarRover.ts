import { HMap, PriorityQueue, Queue, measure/*, round2*/ } from 'utils';

import Coords, { equal, hash, surroundings } from 'data/Coords';
import Map from 'data/Map';

import CachedRover from './CachedRover';
import RoverAI from './RoverAI';
import CostMixin from './CostMixin';
import TreeMixin, { TNode } from './TreeMixin';

// Types
export interface Node extends TNode {
  pos: Coords,
  from: Coords | null,
  obstacle: boolean,
  cost: number, min_cost: number
}

interface Update {
  pos: Coords,
  obstacle?: boolean
}

// Utils
/*function pp(v: number): string {
  if (!isFinite(v)) return 'infinite';
  return round2(v).toString();
}*/

export class UpdateList {
  // Attributes
  private readonly _list = new Array<Update>();

  // Property
  get length() {
    return this._list.length;
  }

  // Methods
  forEach(cb: (value: Update) => void) {
    this._list.forEach(cb);
  }

  update(...coords: Coords[]) {
    coords.forEach(pos => this._list.push({ pos }))
  }

  obstacles(...coords: Coords[]) {
    coords.forEach(pos => this._list.push({ pos, obstacle: true }))
  }
}

// Class
abstract class FocusedDStarRover extends CachedRover implements CostMixin, TreeMixin {
  // Inspired by https://fr.wikipedia.org/wiki/Algorithme_D*
  // Attributes
  private readonly _dstar_nodes = new HMap<Coords,Node>(hash);
  private _tree_version: number = 0;

  // Constructor
  constructor(map: Map, pos: Coords, target: Coords, gaugeSize?: number) {
    super(map, pos, target, gaugeSize);

    this.init();
  }

  // Abstract methods
  protected abstract shouldExpand(node: Node): boolean
  protected abstract heuristic(from: Coords, to: Coords): number;

  protected isObstacle(p: Coords): boolean {
    return false;
  }

  // Methods
  // - manage data
  private initNode(pos: Coords, cost: number, from: Coords | null) {
    const obstacle = this.isObstacle(pos);

    if (obstacle) {
      this._dstar_nodes.set(pos, { pos, cost: Infinity, min_cost: Infinity, from: null, obstacle });
    } else {
      this._dstar_nodes.set(pos, {pos, cost, min_cost: cost, from, obstacle});
    }
  }

  getCost(pos: Coords): number {
    const n = this.getNode(pos);
    return n ? n.cost : Infinity;
  }

  // - tree access
  getNode(pos: Coords): Node | undefined {
    return this._dstar_nodes.get(pos);
  }

  getChildren(node: Node): Array<Node> {
    return surroundings(node.pos).reduce((acc, p) => {
      const n = this.getNode(p);
      if (n && !n.obstacle && n.from && equal(node.pos, n.from)) {
        acc.push(n);
      }

      return acc;
    }, new Array<Node>());
  }

  treeVersion(): number {
    return this._tree_version
  }

  // - algorithms
  @measure({ limit: 10 })
  private init() { // A*
    const queue = new PriorityQueue<Coords>();

    // Setup
    this.initNode(this.target, 0, this.target);
    queue.enqueue(this.target, 0);

    // Compute
    while (!queue.isEmpty) {
      // dequeue
      const [pos, cost] = queue.dequeue();
      if (!pos) break; // should not happen

      if ((this.getNode(pos) as Node).obstacle) continue;

      // parse surroundings
      surroundings(pos).forEach(p => {
        if (!this.inMap(p)) return;

        // compute cost
        const c = this.heuristic(p, pos) + cost;

        const n = this.getNode(p);
        if (!n) { // new node
          //console.log(`new node ${p.x},${p.y} (${c})`);

          this.initNode(p, c, pos);
          queue.enqueue(p, c);

        } else if (!n.obstacle && n.cost > c) { // better path ?
          //console.log(`lower ${p.x},${p.y} (${pp(n.cost)} => ${pp(c)} by ${pos.x},${pos.y})`);

          n.cost = c; n.min_cost = c;
          n.from = pos;

          queue.enqueue(p, c);
        }
      });
    }

    ++this._tree_version;
  }

  private isRaised(node: Node): boolean { // D* (part 1)
    if (node.obstacle) return isFinite(node.min_cost); // obstacle => infinite cost

    // if raised check if can lower
    if (node.cost > node.min_cost) {
      surroundings(node.pos).forEach(p => {
        if (!this.inMap(p)) return;

        const n = this.getNode(p) as Node;
        if (n.obstacle || !n.from) return; // n has infinite cost

        // compute cost
        const c = this.heuristic(node.pos, p) + n.cost;

        if (!node.from || c < node.cost) {
          //console.log(`lower: ${node.pos.x},${node.pos.y} (${pp(node.cost)} => ${pp(c)} by ${p.x},${p.y})`);

          node.cost = c;
          node.from = p;
        }
      });
    }

    return node.cost > node.min_cost;
  }
  private expand(open: Queue<Node>) { // D* (part 2)
    while (!open.isEmpty) {
      const node = open.dequeue() as Node;

      if (!this.shouldExpand(node)) {
        //console.log(`refused ${node.pos.x},${node.pos.y}`);
        continue;
      }

      //console.log(`expand ${node.pos.x},${node.pos.y}`);
      const raised = this.isRaised(node);

      surroundings(node.pos).forEach(p => {
        if (!this.inMap(p)) return;
        //console.log(`treating ${p.x},${p.y}`);

        const n = this.getNode(p) as Node;

        // compute cost
        const c = this.heuristic(p, node.pos) + node.cost;

        if (raised) { // node raised
          if (!n.from) return;

          if (node.obstacle || !node.from) { // node became unreachable
            if (equal(n.from, node.pos)) { // path goes threw node
              //console.log(`raise: ${p.x},${p.y} (${pp(n.cost)} => infinite)`);

              // n must be unreachable too
              n.from = null;
              n.cost = Infinity;

              open.enqueue(n);
            } else if (!n.obstacle && !node.obstacle) { // will lower from here
              //console.log(`lower from: ${node.pos.x},${node.pos.y}`);

              // update min cost
              node.min_cost = node.cost;

              open.enqueue(node);
            }
          } else {
            if (equal(n.from, node.pos)) { // path goes threw node
              //console.log(`raise: ${p.x},${p.y} (${pp(n.cost)} => ${pp(c)})`);

              // n must raise too
              n.cost = c;

              open.enqueue(n);
            } else if (!n.obstacle && c < n.cost) { // will lower from here
              //console.log(`lower from: ${node.pos.x},${node.pos.y}`);

              // update min cost
              node.min_cost = node.cost;

              open.enqueue(node);
            }
          }
        } else if (!n.obstacle && c < n.cost) { // can lower
          //console.log(`lower: ${p.x},${p.y} (${pp(n.cost)} => ${pp(c)} by ${node.pos.x},${node.pos.y})`);

          // lower p and set path by pos
          n.cost = c;
          n.from = node.pos;

          open.enqueue(n);
        }
      });
    }
  }
  @measure({ limit: 10 })
  private update(updates: UpdateList) { // D* (part 3)
    const open = new Queue<Node>();

    // Updates
    updates.forEach(upd => {
      const node = this.getNode(upd.pos);
      if (!node) return;

      if (upd.obstacle) { // add obstacle
        node.obstacle = true;
        node.cost = Infinity;
        node.from = null;

        open.enqueue(node);
      } else if (node.obstacle) { // remove obstacle
        node.obstacle = false;

        open.enqueue(node);
      } else if (!node.from) { // became reachable ?
        open.enqueue(node);
      } else {
        const n = this.getNode(node.from) as Node;
        const c = this.heuristic(upd.pos, node.from) + n.cost;

        if (c !== node.cost) { // new cost
          node.cost = c;
          open.enqueue(node);
        } else { // check around
          surroundings(upd.pos).forEach(p => {
            if (!this.inMap(p)) return;

            const n = this.getNode(p) as Node;
            const c = this.heuristic(upd.pos, p) + n.cost;

            if (c < node.cost) {
              node.cost = c;
              node.from = p;
              open.enqueue(node);
            }
          });
        }
      }
    });

    // Expand !
    this.expand(open);
    ++this._tree_version;
  }

  // - rover
  protected detect(updates: UpdateList, next: { from: Coords, cost: number }) {
    // Check if there is an obstacle
    const floor = this.getFloor(next.from); // cost 0.2 energy

    if (floor === 'hole') {
      updates.obstacles(next.from);
    }
  }

  protected compute(): Coords {
    // Compute !
    let i = 8;
    while (true) {
      const np = this.getNode(this.pos);
      if (!np || !np.from || np.obstacle) return this.pos;

      const nf = this.getNode(np.from) as Node;

      // Check if known as an obstacle
      if (nf.obstacle) return this.pos;

      // Check if there is an obstacle
      const updates = new UpdateList();
      this.detect(updates, { from: np.from, cost: np.cost });
      if (updates.length > 0) {
        this.update(updates);

        --i;
        if (i !== 0) continue;
      }

      return np.from;
    }
  }

  restart(keep: boolean = false): RoverAI {
    super.restart(keep);

    this._dstar_nodes.clear();
    this.init();

    return this;
  }
}

export default FocusedDStarRover;
