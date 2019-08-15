// Decorator
function measure<T,R = void>(name?: string) {
  return function(target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const f = descriptor.value as (this: T) => any;

    function m<A extends any[]>(this: T, ...args: A): R {
      const start = performance.now();

      const r = f.apply<T,A,R>(this, args);

      const end = performance.now();
      console.log(`${name || propertyKey} took: ${end-start}ms`);

      return r;
    }

    descriptor.value = m;
  }
}

export default measure;