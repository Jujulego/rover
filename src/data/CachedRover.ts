import { RoverAI } from './RoverAI';
import { FloorType } from './Map';
import { Coords, equal, slope } from "data/Coords";

// Type
type CachedCase = { floor ?: FloorType, height ?: number };
type CachedSlope = { c1: Coords, c2: Coords, slope: number };

// Constants
const SLOPE_CACHE_LIMIT = 128;

// Class
export abstract class CachedRover extends RoverAI {
  // Attributes
  private _mapCache: { [name in string]: CachedCase } = {};
  private _slopeCache: Array<CachedSlope> = [];

  // Methods
  resetCache() {
    this._mapCache = {};
    this._slopeCache = [];
  }

  restart(): RoverAI {
    super.restart();
    this.resetCache();

    return this;
  }

  protected getFloor(c: Coords): FloorType {
    // Try cache
    const cached = this.get(c);
    if (cached.floor) return cached.floor;

    // Ask and store
    const result = super.getFloor(c);
    this.update(c, { floor: result });

    return result;
  }

  protected getSlope(c1: Coords, c2: Coords): number {
    // Try map cache first
    const cached1 = this.get(c1);
    const cached2 = this.get(c2);
    if (cached1.height && cached2.height) {
      return slope(c1, cached1.height, c2, cached2.height);
    }

    // Try slope cache
    const cached = this.getCachedSlope(c1, c2);
    if (cached) return cached;

    // Ask and store
    const result = super.getSlope(c1, c2);
    this.storeSlope(c1, c2, result);

    return result;
  }

  // - map cache
  private static hash(c: Coords): string {
    return `${c.x},${c.y}`;
  }

  private get(c: Coords): CachedCase {
    return this._mapCache[CachedRover.hash(c)] || {};
  }

  private update(c: Coords, data: CachedCase) {
    const hash = CachedRover.hash(c);
    this._mapCache[hash] = { ...this._mapCache[hash], ...data };
    console.log(this._mapCache);
  }

  // - slope cache
  private moveSlopeToTop(i: number) {
    if (i === 0) return;

    const tmp = this._slopeCache[i];
    for (let j = i; j > 0; --j) {
      this._slopeCache[j] = this._slopeCache[j-1];
    }

    this._slopeCache[0] = tmp;
  }

  private getCachedSlope(c1: Coords, c2: Coords): number | undefined {
    for (let i = 0; i < this._slopeCache.length; ++i) {
      const cached = this._slopeCache[i];

      if (equal(cached.c1, c1) && equal(cached.c2, c2)) {
        this.moveSlopeToTop(i);
        return cached.slope;
      }

      if (equal(cached.c2, c1) && equal(cached.c1, c2)) {
        this.moveSlopeToTop(i);
        return -cached.slope;
      }
    }

    return;
  }

  private storeSlope(c1: Coords, c2: Coords, slope: number) {
    this._slopeCache.unshift({ c1, c2, slope });

    if (this._slopeCache.length > SLOPE_CACHE_LIMIT) {
      this._slopeCache.pop();
    }
  }
}