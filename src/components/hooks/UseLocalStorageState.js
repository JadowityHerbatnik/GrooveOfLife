import { useState, useEffect } from "react";

export const useLocalStorageState = (localStorageKey, defaultValue) => {
  let initalValue;
  if (typeof window !== "undefined") {
    initalValue = localStorage.getItem(localStorageKey) || defaultValue;
  } else {
    initalValue = defaultValue;
  }
  const [value, setValue] = useState(initalValue);

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value, localStorageKey]);

  return [value, setValue];
};
