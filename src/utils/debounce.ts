// Types
type DFunction<T,A extends any[]> = (this: T, ...args: A) => void
interface Cancel {
  cancel: () => void
}

// Utils
function debounce<T,A extends any[]>(func: DFunction<T,A>, wait: number = 166): DFunction<T,A> & Cancel {
  let timeout: number;

  function debounced(this: T, ...args: A) {
    const that: T = this;
    const later = () => { func.apply(that, args); };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait) as unknown as number;
  }

  debounced.cancel = () => clearTimeout(timeout);

  return debounced;
}

export default debounce;