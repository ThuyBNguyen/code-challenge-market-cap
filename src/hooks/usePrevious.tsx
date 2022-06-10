import { useEffect, useRef } from 'react';

/**
 * Compare current value and previuos value from state or props
 * @param value is value of state or prop
 *
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function usePrevious(value): unknown {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default usePrevious;
