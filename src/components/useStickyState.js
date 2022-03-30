import { useEffect, useState } from "react";

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const isBrowser = typeof window !== `undefined`;
    const stickyValue = isBrowser ? window.localStorage.getItem(key) : null;
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    const windowGlobal = typeof window !== `undefined` && window;

    if (windowGlobal) {
      windowGlobal.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
  return [value, setValue];
}

export default useStickyState;
