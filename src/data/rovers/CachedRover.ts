import { FloorType } from '../Map';
import Coords, { hash, equal, slope } from '../Coords';
import RoverAI from '../RoverAI';

// Type
type CachedCase = { floor ?: FloorType, height ?: number };
type CachedSlope = { c1: Coords, c2: Coords, slope: number };

// Constants
const SLOPE_CACHE_LIMIT = 128;

// Class
abstract class CachedRover extends RoverAI {
  // Attributes
  private _mapCache: { [name in string]: CachedCase } = {};
  private _slopeCache: Array<CachedSlope> = [];

  // Methods
  resetCache() {
    this._mapCache = {};
    this._slopeCache = [];
  }

  restart(keep: boolean = false): RoverAI {
    super.restart();
    if (!keep) this.resetCache();

    return this;
  }

  protected getFloor(c: Coords): FloorType {
    // Try cache
    const cached = this.getCachedCase(c);
    if (cached.floor) return cached.floor;

    // Ask and store
    const result = super.getFloor(c);
    this.updateCache(c, { floor: result });

    return result;
  }

  protected getSlope(c1: Coords, c2: Coords): number {
    // Try map cache first
    const cached1 = this.getCachedCase(c1);
    const cached2 = this.getCachedCase(c2);
    if (cached1.height && cached2.height) {
      return slope(c1, cached1.height, c2, cached2.height);
    }

    // Try slope cache
    const cached = this.getCachedSlope(c1, c2);
    if (cached != null) return cached;

    // Ask and store
    const result = super.getSlope(c1, c2);
    this.storeSlope(c1, c2, result);

    return result;
  }

  // - map cache
  getCachedCase(c: Coords): CachedCase {
    return this._mapCache[hash(c)] || {};
  }

  private updateCache(c: Coords, data: CachedCase) {
    const h = hash(c);
    this._mapCache[h] = { ...this._mapCache[h], ...data };
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

  getCachedSlope(c1: Coords, c2: Coords): number | null {
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

    return null;
  }

  private storeSlope(c1: Coords, c2: Coords, slope: number) {
    this._slopeCache.unshift({ c1, c2, slope });

    if (this._slopeCache.length > SLOPE_CACHE_LIMIT) {
      this._slopeCache.pop();
    }
  }
}

export default CachedRover;
