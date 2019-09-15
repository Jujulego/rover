import { DEFAULT_FLOOR, DEFAULT_HEIGHT } from './constants';
import Coords, { slope, surrounding } from './Coords';

import Direction, { DBorder, DMove, isAngle, MOVES, rotateL, rotateR } from 'data/Direction';

// Types
export type FloorType = 'rock' | 'sand' | 'ice' | 'hole';
export type BorderType = 'hole' | 'end';

type Layer = { dir?: DBorder, type: FloorType | 'end', height: number }
export type Borders = { [name in DMove]: Layer[] };

export interface Case {
  height: number,
  floor: FloorType
}

// Constants
const DEFAULT_BORDERS: Borders = {
  [Direction.T]:   [],
  [Direction.TRA]: [],
  [Direction.R]:   [],
  [Direction.BRA]: [],
  [Direction.B]:   [],
  [Direction.BLA]: [],
  [Direction.L]:   [],
  [Direction.TLA]: []
};

// Utils
function reduceLayers(ll: Layer | undefined, lr: Layer): Layer {
  if (!ll) return lr;
  if (ll.dir && lr.dir && isAngle(lr.dir)) return ll;

  return {
    dir: ll.dir ? lr.dir && (ll.dir | lr.dir) : lr.dir,
    type: (ll.type === 'end' || lr.type === 'hole') ? lr.type : ll.type,
    height: ll.height
  }
}

// Class
class Map {
  // Attributes
  private readonly data: Array<Array<Case>>;
  private _version: number = 1;

  // Constructors
  constructor(map: Array<Array<Case>>) {
    this.data = map;
  }

  // Properties
  get size(): Coords {
    return {
      x: this.data.length,
      y: this.data.length > 0 ? this.data[0].length : 0
    };
  }

  get version() { return this._version; }

  // Static methods
  static loadMap(map: Array<Array<number>>): Map {
    const result = new Array<Array<Case>>();
    result.push([]);

    for (let i = 0; i < map[0].length; ++i) {
      const floor = this.getFloorType(map[0][i]);

      let height = 0;
      for (let j = 1; j < map.length; ++j) {
        if (map[j][i] !== 0) {
          height++
        }
      }

      result[result.length - 1].push({ floor, height });
      if (result[result.length - 1].length === Math.sqrt(map[0].length) && i !== map[0].length - 1) {
        result.push([]);
      }
    }

    return new Map(result);
  }

  private static getFloorType(type: number): FloorType {
    if (type <= 4) return 'sand';
    else if (type <= 8) return 'rock';
    else if (type <= 12) return 'ice';
    else return 'hole';
  }

  // Methods
  isOut(pos: Coords): boolean {
    return (pos.x < 0 || pos.x >= this.size.x) || (pos.y < 0 || pos.y >= this.size.y);
  }

  get(pos: Coords): Case | undefined {
    if (this.isOut(pos)) return;

    const data = this.data[pos.y][pos.x];
    if (data.floor === 'hole') return { ...data, height: 0 };

    return data;
  }
  update(pos: Coords, data: Partial<Case>) {
    if (!this.isOut(pos)) {
      const c = this.data[pos.y][pos.x];
      this.data[pos.y][pos.x] = { ...c, ...data };

      ++this._version;
    }
  }
  getOrDefault(pos: Coords): Case {
    return this.isOut(pos) ? { height: DEFAULT_HEIGHT, floor: DEFAULT_FLOOR } : this.data[pos.y][pos.x];
  }

  map<T>(cb: (pos: Coords, c: Case) => T): Array<T> {
    const results: Array<T> = [];

    this.data.forEach((row, y) => {
      row.forEach((c, x) => {
        results.push(cb({ x, y }, c));
      });
    });

    return results;
  }

  private layers(pos: Coords, dir: DMove): Layer[] {
    const data = this.get(pos);

    // out of map
    if (!data) return [];

    // get dirs
    const dirs = [dir];
    if (isAngle(dir)) {
      dirs.unshift(rotateR(dir));
      dirs.unshift(rotateL(dir));
    }

    // get cases
    const cases: ({ floor: FloorType | 'end', height: number, dir: DMove })[] = dirs.map(dir => {
      const d = this.get(surrounding(pos, dir));

      if (!d) return { floor: 'end', height: 0, dir };
      return { ...d, dir };
    });

    // get heights
    const heights = cases.map(c => c.height)
      .sort((h1, h2) => h2 - h1)
      .filter((h, i, hs) => i === 0 || h !== hs[i-1]); // remove copies

    if (heights[0] < data.height) {
      heights.unshift(data.height);
    }

    // compute layers
    const layers = new Array<Layer>();
    let bottom: FloorType | 'end' | undefined;

    heights.forEach(h => {
      // compute layer (level h)
      let layer: Layer | undefined;

      cases.forEach(c => {
        if (c.floor === 'end') { // ends
          layer = reduceLayers(layer, { dir: c.dir, type: 'end', height: h });
          bottom = 'end';
        } else if (c.floor === 'hole') { // holes
          layer = reduceLayers(layer, { dir: c.dir, type: data.floor, height: h });
          bottom = 'hole';
        } else if (c.height < data.height) {
          if (c.height < h) {
            layer = reduceLayers(layer, { dir: c.dir, type: data.floor, height: h });
          } else if (c.height === h) {
            layer = reduceLayers(layer, { dir: layer && layer.dir, type: c.floor, height: h });
          }

          if ((!bottom || bottom === 'end') && data.floor !== 'hole') bottom = c.floor;
        }
      });

      // add layer
      if (layer) layers.unshift(layer);
    });

    return [{ type: bottom || data.floor, height: -1 }, ...layers];
  }

  borders(pos: Coords): Borders {
    return MOVES.reduce((borders, dir) => {
      borders[dir] = this.layers(pos, dir);
      return borders;
    }, DEFAULT_BORDERS);
  }

  slope(c1: Coords, c2: Coords): number {
    const z1 = this.getOrDefault(c1).height;
    const z2 = this.getOrDefault(c2).height;

    return slope(c1, z1, c2, z2);
  }
}

export default Map;
