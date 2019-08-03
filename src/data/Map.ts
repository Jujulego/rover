import { DEFAULT_FLOOR, DEFAULT_HEIGHT, Direction, DIRECTIONS } from './constants';
import {
  Coords, realDistance, surrounding
} from './Coords';

// Types
export type FloorType = 'rock' | 'sand' | 'ice' | 'hole';
export type Borders = { [name in Direction]?: boolean };

export interface Case {
  height: number,
  floor: FloorType
}

// Class
export class Map {
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

  slope(c1: Coords, c2: Coords): number {
    const z1 = this.getOrDefault(c1).height;
    const z2 = this.getOrDefault(c2).height;

    return (z2 - z1) / realDistance(c1, c2);
  }
}
