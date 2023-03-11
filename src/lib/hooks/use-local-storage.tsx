import { useCallback } from 'react';

const useLocalStorage = (
  key: string
): [string | null, (value: string) => void] => {
  const set = useCallback(
    (value: string) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    },
    [key]
  );

  const get = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key);
    }
    return null;
  }, [key]);

  const value = get();

  return [value, set];
};

export default useLocalStorage;
