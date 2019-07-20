import {
  Coords, Direction,
  DIRECTIONS, surrounding
} from './Coords';

// Types
export type FloorType = 'rock' | 'hole';
export type Case = { floor: FloorType };
export type Borders = { [name in Direction]?: boolean };

// Class
export class Map {
  // Attributes
  private data: Array<Array<Case>>;

  // Constructors
  constructor(map: Array<Array<Case>>) {
    this.data = map;
  }

  // Properties
  get size(): Coords {
    return {
      x: this.data.length,
      y: this.data.length
    };
  }

  // Methods
  get(pos: Coords): Case | undefined {
    if ((pos.x < 0 || pos.x >= this.size.x)) return;
    if ((pos.y < 0 || pos.y >= this.size.y)) return;

    return this.data[pos.y][pos.x];
  }
  set(pos: Coords, c: Case) {
    this.data[pos.y][pos.x] = c;
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
}