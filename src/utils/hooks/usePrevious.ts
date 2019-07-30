import { useEffect, useRef } from 'react';

// Hook
function usePrevious<T>(v: T): T | null {
  // Ref
  const previous = useRef<T | null>(null);

  // Effect
  useEffect(() => {
    previous.current = v;
  });

  return previous.current;
}

export default usePrevious;