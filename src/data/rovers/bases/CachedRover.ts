import { Cache, HMap } from 'utils';

import Coords, { equal, hash, slope } from 'data/Coords';
import { FloorType } from 'data/Map';

import RoverAI from './RoverAI';

// Type
interface CachedCase { floor?: FloorType, height?: number }
interface Slope { c1: Coords, c2: Coords }

// Constants
const SLOPE_CACHE_LIMIT = 128;

// Class
abstract class CachedRover extends RoverAI {
  // Attributes
  private _mapCache = new HMap<Coords,CachedCase>(hash);
  private _slopeCache = new Cache<Slope,number>((s1, s2) => equal(s1.c1, s2.c1) && equal(s1.c2, s2.c2), SLOPE_CACHE_LIMIT);

  // Methods
  resetCache() {
    this._mapCache.clear();
    this._slopeCache.clear();
  }

  restart(keep: boolean = false): RoverAI {
    super.restart();
    if (!keep) this.resetCache();

    return this;
  }

  protected getFloor(c: Coords, refresh: boolean = false): FloorType {
    // Try cache
    if (!refresh) {
      const cached = this.getCachedCase(c);
      if (cached.floor) return cached.floor;
    }

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
    return this._mapCache.get(c) || {};
  }

  private updateCache(c: Coords, data: CachedCase) {
    this._mapCache.set(c, { ...this._mapCache.get(c), ...data });
  }

  // - slope cache
  getCachedSlope(c1: Coords, c2: Coords): number | null {
    // known on the right direction
    let cached = this._slopeCache.get({c1, c2});
    if (cached !== undefined) return cached;

    // known on the other direction
    cached = this._slopeCache.get({c1: c2, c2: c1});
    if (cached !== undefined) return -cached;

    return null;
  }

  private storeSlope(c1: Coords, c2: Coords, slope: number) {
    this._slopeCache.set({ c1, c2 }, slope);
  }
}

export default CachedRover;
