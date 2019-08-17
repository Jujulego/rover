// Types
interface Element<K,V> { key: K, value: V }
export type IsEqual<T> = (obj1: T, obj2: T) => boolean;

// Class
class Cache<K,V> {
  // Attributs
  readonly limit: number | null;
  readonly isEqual: IsEqual<K>;

  private _cache = new Array<Element<K,V>>();

  // Properties
  get size(): number {
    return this._cache.length;
  }

  // Constructor
  constructor(isEqual: IsEqual<K>, limit: number | null = null) {
    this.limit = limit;
    this.isEqual = isEqual;
  }

  // Methods
  private ensureLimit() {
    if (this.size === this.limit) {
      this._cache.pop();
    }
  }

  // - access
  get(key: K): V | undefined {
    const el = this._cache.find(el => this.isEqual(el.key, key));
    return el && el.value;
  }

  set(key: K, value: V) {
    this.ensureLimit();
    const el = { key, value };

    this._cache.unshift(el);
  }

  delete(key: K) {
    const i = this._cache.findIndex(el => this.isEqual(el.key, key));
    this._cache.splice(i);
  }

  clear() {
    this._cache = new Array<Element<K,V>>();
  }
}

export default Cache;