import Direction, { DMove, isMove, MOVES, rotateL, rotateR } from './Direction';
import { HMap, Stack } from 'utils';

// Types
export default interface Coords {
  x: number,
  y: number
}

// Utils
export function isCoords(obj: any): obj is Coords {
  return ('x' in obj) && ('y' in obj);
}

export function hash(c: Coords): string {
  return `${c.x},${c.y}`;
}

export function equal(c1: Coords, c2: Coords): boolean {
  return (c1.x === c2.x) && (c1.y === c2.y)
}

export function distance(c1: Coords, c2: Coords): number {
  const dx = Math.abs(c2.x - c1.x);
  const dy = Math.abs(c2.y - c1.y);

  return dx + dy - Math.min(dx, dy);
}

export function realDistance(c1: Coords, c2: Coords): number {
  const dx = Math.abs(c2.x - c1.x);
  const dy = Math.abs(c2.y - c1.y);

  const diags = Math.min(dx, dy);
  const lines = Math.max(dx, dy) - diags;

  return lines * 5 + diags * Math.sqrt(50);
}

export function slope(c1: Coords, z1: number, c2: Coords, z2: number) {
  const d = realDistance(c1, c2);

  return (d !== 0) ? (z2 - z1) / d : 0;
}

export function direction(from: Coords, to: Coords): DMove | undefined {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const dh = dy < 0 ? Direction.T : (dy > 0 ? Direction.B : Direction.N);
  const dw = dx < 0 ? Direction.L : (dx > 0 ? Direction.R : Direction.N);
  const d = dh ^ dw;

  return isMove(d) ? d : undefined;
}

export function surrounding(pos: Coords, dir: DMove): Coords {
  switch (dir) {
    case Direction.T:   return { x: pos.x    , y: pos.y - 1 };
    case Direction.TLA: return { x: pos.x - 1, y: pos.y - 1 };
    case Direction.L:   return { x: pos.x - 1, y: pos.y     };
    case Direction.BLA: return { x: pos.x - 1, y: pos.y + 1 };
    case Direction.B:   return { x: pos.x    , y: pos.y + 1 };
    case Direction.BRA: return { x: pos.x + 1, y: pos.y + 1 };
    case Direction.R:   return { x: pos.x + 1, y: pos.y     };
    case Direction.TRA: return { x: pos.x + 1, y: pos.y - 1 };
  }
}

export function surroundings(pos: Coords): Array<Coords> {
  return MOVES.map(dir => surrounding(pos, dir));
}

export function sight(from: Coords, dir: DMove, width: number, depth: number): Array<Coords> {
  // get directions according to the width
  const dirs = [dir];
  let dl = dir; let dr = dir;

  while (dirs.length < width) {
    dl = rotateL(dl);
    dirs.push(dl);
    if (dirs.length === width) break;

    dr = rotateR(dr);
    dirs.unshift(dr);
  }

  // get cases
  const sight = new Array<Coords>();
  const marks = new HMap<Coords,number>(hash);
  const stack = new Stack<Coords>();

  stack.put(from);
  marks.set(from, 0);

  while (!stack.isEmpty) {
    const pos = stack.get() as Coords;
    const dist = marks.get(pos) as number;

    if (dist >= depth) continue;

    // next !
    dirs.forEach(d => {
      const p = surrounding(pos, d);

      if (p && !marks.has(p)) {
        marks.set(p, dist + 1);
        sight.push(p);
        stack.put(p);
      }
    });
  }

  return sight;
}

export function zoneTopLeft(center: Coords, size: Coords): Coords {
  return {
    x: center.x - ((size.x - size.x % 2) / 2),
    y: center.y - ((size.y - size.y % 2) / 2)
  };
}

export function generateZone<T>(centers: Array<Coords>, size: Coords, cb: (coords: Coords, i: number, j: number) => T): Array<T> {
  // sort => top left first
  centers.sort((c1, c2) => (c1.x === c2.x ? c1.y - c2.y : c1.x - c2.x));

  // compute coords
  const abs_tl = zoneTopLeft(centers.reduce((acc, c) => ({ x: Math.min(acc.x, c.x), y: Math.min(acc.y, c.y) }), centers[0]), size);
  const computed = new Map<String,Boolean>();
  const result: Array<T> = [];

  centers.forEach((center) => {
    const tl = zoneTopLeft(center, size);

    for (let i = 0; i < size.x; ++i) {
      const ai = i + tl.x - abs_tl.x;

      for (let j = 0; j < size.y; ++j) {
        const aj = j + tl.y - abs_tl.y;
        const key = `${ai} ${aj}`;

        // already computed ?
        if (computed.get(key)) continue;

        // compute
        result.push(
          cb({ x: tl.x + i, y: tl.y + j }, ai, aj)
        );
        computed.set(key, true)
      }
    }
  });

  return result;
}
