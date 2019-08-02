import { DependencyList, useEffect } from 'react';

import debounce from '../debounce';

// Hook
function useDebounceEffect(effect: () => void, deps: DependencyList, wait: number = 166) {
  useEffect(() => {
    const debounced = debounce(effect, wait);
    debounced();

    return debounced.cancel;
  }, [wait, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
}

export default useDebounceEffect;