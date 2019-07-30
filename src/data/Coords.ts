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

export function generateZone<T>(center: Coords, size: Coords, cb: (coords: Coords, i: number, j: number) => T): Array<T> {
  // compute top left case
  const topleft: Coords = {
    x: center.x - ((size.x - size.x % 2) / 2),
    y: center.y - ((size.y - size.y % 2) / 2),
  };

  // compute coords
  const result: Array<T> = [];
  for (let i = 0; i < size.x; ++i) {
    for (let j = 0; j < size.y; ++j) {
      result.push(
        cb({ x: topleft.x + i, y: topleft.y + j }, i, j)
      )
    }
  }

  return result;
}
