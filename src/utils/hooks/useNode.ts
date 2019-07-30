import {
  useCallback, useRef,
  DependencyList, RefObject
} from 'react';

// Hook
function useNode<T extends HTMLElement>(cb?: (node: T) => void, deps: DependencyList = []): [RefObject<T>, (node: T) => void] {
  const nodeRef = useRef<T | null>(null);
  const nodeCb = useCallback((node: T) => {
    nodeRef.current = node;
    if (cb) cb(node);
  }, [...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return [nodeRef, nodeCb];
}

export default useNode;