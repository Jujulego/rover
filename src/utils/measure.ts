// Types
interface Options {
  name?: string,
  limit?: number
}

// Decorator
function measure<T,R = void>(opts: Options = {}) {
  return function(target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const f = descriptor.value as (this: T) => any;

    function m<A extends any[]>(this: T, ...args: A): R {
      const start = performance.now();

      const r = f.apply<T,A,R>(this, args);

      const end = performance.now();
      if (!opts.limit || (end - start > opts.limit)) {
        console.log(`${opts.name || propertyKey} took: ${end - start}ms`);
      }

      return r;
    }

    descriptor.value = m;
  }
}

export default measure;