import { useEffect, useRef } from "react";

export const useTimeout = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const cbFunc = () => {
      savedCallback.current();
    };

    if (delay) {
      let id = setTimeout(cbFunc, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};
