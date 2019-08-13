import { DEFAULT_FLOOR, DEFAULT_HEIGHT, Direction, DIRECTIONS } from './constants';
import Coords, {
  slope, surrounding, surrounding2
} from './Coords';

import { DAngle, DStrait, MOVES } from 'data/Direction';

// Types
export type FloorType = 'rock' | 'sand' | 'ice' | 'hole';
export type BorderType = 'hole' | 'end';
export type Borders = { [name in Direction]?: boolean };
export type Cliffs = { [name in DStrait | DAngle]?: boolean };
export type Borders2 = { [name in DStrait | DAngle]?: BorderType };

export interface Case {
  height: number,
  floor: FloorType
}

// Class
class Map {
  // Attributes
  private readonly data: Array<Array<Case>>;

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

    return this.data[pos.y][pos.x];
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

  borders(pos: Coords): Borders {
    const borders: Borders = {};

    DIRECTIONS.forEach(dir => {
      const p = this.get(surrounding(pos, dir));
      borders[dir] = p ? p.floor === 'hole' : true;
    });

    return borders;
  }

  borders2(pos: Coords): Borders2 {
    const data = this.get(pos);
    if (!data) return {};

    return MOVES.reduce((borders: Borders2, dir) => {
      const c = this.get(surrounding2(pos, dir));

      if (!c || (data.floor === 'hole' && !c)) {
        borders[dir] = 'end';
      } else if (c.floor === 'hole') {
        borders[dir] = 'hole';
      }

      return borders;
    }, {});
  }

  cliffs(pos: Coords): Cliffs {
    const data = this.get(pos);
    if (!data || data.floor === 'hole') return {};

    return MOVES.reduce((cliffs: Cliffs, dir) => {
      const c = this.get(surrounding2(pos, dir));

      if (!c || c.floor === 'hole' || c.height < data.height) {
        cliffs[dir] = true;
      }

      return cliffs;
    }, {});
  }

  slope(c1: Coords, c2: Coords): number {
    const z1 = this.getOrDefault(c1).height;
    const z2 = this.getOrDefault(c2).height;

    return slope(c1, z1, c2, z2);
  }
}

export default Map;
