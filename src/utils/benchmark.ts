// Types
interface Options { name?: string }

// Decorator
function benchmark<T,R = void>(count: number, opts: Options = {}) {
  return function(target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const f = descriptor.value as (this: T) => any;

    function m<A extends any[]>(this: T, ...args: A): R {
      const start = performance.now();

      const r = f.apply<T,A,R>(this, args);
      for (let i = 0; i < count; ++i) {
        f.apply<T,A,R>(this, args);
      }

      const end = performance.now();
      console.log(`benchmark ${opts.name || propertyKey} (x${count}): ${(end - start) / count}ms each, total ${end - start}ms`);

      return r;
    }

    descriptor.value = m;
  }
}

export default benchmark;