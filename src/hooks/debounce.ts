import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay: number, minLength: number = 3): string {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value.length >= minLength) {
        setDebounce(value);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay, minLength]);

  return debounce;
}
