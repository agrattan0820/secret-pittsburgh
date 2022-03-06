import { useEffect, useState } from "react";

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const windowGlobal = typeof window !== `undefined` && window;
    const stickyValue = windowGlobal
      ? windowGlobal.localStorage.getItem(key)
      : null;
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
