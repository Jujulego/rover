import { Direction } from "data/constants";
import Direction2, { DMove } from 'data/Direction';

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

export function direction(from: Coords, to: Coords): Direction | undefined {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  switch (`${dx},${dy}`) {
    case '0,-1': return 'top';
    case '1,-1': return 'topRight';
    case '1,0': return 'right';
    case '1,1': return 'bottomRight';
    case '0,1': return 'bottom';
    case '-1,1': return 'bottomLeft';
    case '-1,0': return 'left';
    case '-1,-1': return 'topLeft';
  }

  return;
}

export function surrounding(pos: Coords, direction: Direction): Coords {
  switch (direction) {
    case 'top':         return { x: pos.x    , y: pos.y - 1 };
    case 'topRight':    return { x: pos.x + 1, y: pos.y - 1 };
    case 'right':       return { x: pos.x + 1, y: pos.y     };
    case 'bottomRight': return { x: pos.x + 1, y: pos.y + 1 };
    case 'bottom':      return { x: pos.x    , y: pos.y + 1 };
    case 'bottomLeft':  return { x: pos.x - 1, y: pos.y + 1 };
    case 'left':        return { x: pos.x - 1, y: pos.y     };
    case 'topLeft':     return { x: pos.x - 1, y: pos.y - 1 };
  }
}

export function surrounding2(pos: Coords, dir: DMove): Coords {
  switch (dir) {
    case Direction2.T:   return { x: pos.x    , y: pos.y - 1 };
    case Direction2.TLA: return { x: pos.x - 1, y: pos.y - 1 };
    case Direction2.L:   return { x: pos.x - 1, y: pos.y     };
    case Direction2.BLA: return { x: pos.x - 1, y: pos.y + 1 };
    case Direction2.B:   return { x: pos.x    , y: pos.y + 1 };
    case Direction2.BRA: return { x: pos.x + 1, y: pos.y + 1 };
    case Direction2.R:   return { x: pos.x + 1, y: pos.y     };
    case Direction2.TRA: return { x: pos.x + 1, y: pos.y - 1 };
  }
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
