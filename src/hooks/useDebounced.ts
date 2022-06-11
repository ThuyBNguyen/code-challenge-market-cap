import { useState, useEffect } from 'react';

function useDebounced<Type>(value: Type, immediate?: boolean): Type {
  const [debouncedValue, setDebouncedValue] = useState<Type>(value);
  useEffect(() => {
    if (immediate) {
      setDebouncedValue(value);
      return;
    }
    let cancel = false;
    setTimeout(() => {
      if (!cancel) setDebouncedValue(value);
    }, 1000);
    return () => {
      cancel = true;
    };
  }, [value, immediate]);
  return debouncedValue;
}

export default useDebounced;
