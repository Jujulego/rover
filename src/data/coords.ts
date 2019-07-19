// Types
export type Coords = { x: number, y: number };

// Utils
export function generateZone<T>(center: Coords, size: number, cb: (coords: Coords, i: number, j: number) => T): Array<T> {
    // compute top left case
    const topleft: Coords = {
        x: center.x - ((size - size % 2) / 2),
        y: center.y - ((size - size % 2) / 2),
    };

    const result: Array<T> = [];
    for (let i = 0; i < size; ++i) {
        for (let j = 0; j < size; ++j) {
            result.push(
                cb({ x: topleft.x + i, y: topleft.y + j }, i, j)
            )
        }
    }

    return result;
}
