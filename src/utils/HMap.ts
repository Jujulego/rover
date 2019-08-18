// Types
interface Element<K,V> { key: K, value: V }
export type Hash<K> = (key: K) => string | number;

// Class
class HMap<K,V> {
  // Attributes
  readonly hash: Hash<K>;
  private readonly _map = new Map<ReturnType<Hash<K>>,Element<K,V>>();

  // Property
  get size(): number {
    return this._map.size;
  }

  // Constructor
  constructor(hash: Hash<K>) {
    this.hash = hash;
  }

  // Methods
  // - basics
  has(key: K): boolean {
    return this._map.has(this.hash(key));
  }

  get(key: K): V | undefined {
    const el = this._map.get(this.hash(key));
    return el && el.value;
  }

  set(key: K, value: V): this {
    this._map.set(this.hash(key), { key, value });
    return this;
  }

  delete(key: K): boolean {
    return this._map.delete(this.hash(key));
  }

  clear() {
    this._map.clear()
  }

  // - utils
  forEach(cb: (value: V, key: K, map: HMap<K, V>) => void, thisArg?: any) {
    this._map.forEach(el => {
      cb.call(thisArg, el.value, el.key, this);
    })
  }
}

export default HMap;