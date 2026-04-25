import { useEffect, useState } from "react";

// React.StrictMode remounts components in development; this ensures
// we only record one visit per actual page load.
let hasIncrementedForBoot = false;

export const formatCounter = (value: number): string => {
  const safe = Number.isFinite(value) && value > 0 ? value : 1;
  return safe.toString().padStart(8, "0");
};

export const useVisitorCounter = (): number => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const key = "visitor-counter-v1";
    const storedValue = window.localStorage.getItem(key);
    const startingValue = storedValue
      ? Number.parseInt(storedValue, 10)
      : 11037 + Math.floor(Math.random() * 4000);
    const normalizedStartingValue = Number.isFinite(startingValue)
      ? startingValue
      : 11037;

    if (!hasIncrementedForBoot) {
      hasIncrementedForBoot = true;
      const incrementedValue = normalizedStartingValue + 1;
      window.localStorage.setItem(key, incrementedValue.toString());
      setCount(incrementedValue);
      return;
    }

    setCount(normalizedStartingValue);
  }, []);

  return count;
};
