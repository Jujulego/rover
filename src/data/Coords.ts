// Types
export type Direction = 'top' | 'topRight' | 'right' | 'bottomRight' | 'bottom' | 'bottomLeft' | 'left' | 'topLeft';
export interface Coords { x: number, y: number }

// Constants
export const DIRECTIONS: Array<Direction> = ['top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left', 'topLeft'];

// Utils
export function isTop(d: Direction): boolean {
  return d === 'topLeft' || d === 'top' || d === 'topRight';
}
export function isRight(d: Direction): boolean {
  return d === 'topRight' || d === 'right' || d === 'bottomRight';
}
export function isBottom(d: Direction): boolean {
  return d === 'bottomRight' || d === 'bottom' || d === 'bottomLeft';
}
export function isLeft(d: Direction): boolean {
  return d === 'bottomLeft' || d === 'left' || d === 'topLeft';
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
