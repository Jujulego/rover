import { useEffect } from 'react';

// Hook
function useWindowEvent(type: keyof WindowEventMap, handler: () =>  void) {
  useEffect(() => {
    window.addEventListener(type, handler);

    return () => {
      window.removeEventListener(type, handler);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

export default useWindowEvent;