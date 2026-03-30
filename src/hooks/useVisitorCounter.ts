import { useEffect, useState } from "react";

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

    const key = "retro-visitor-counter-v1";
    const storedValue = window.localStorage.getItem(key);
    const startingValue = storedValue
      ? Number.parseInt(storedValue, 10)
      : 11037 + Math.floor(Math.random() * 4000);
    const normalizedValue = Number.isFinite(startingValue)
      ? startingValue + 1
      : 11038;

    window.localStorage.setItem(key, normalizedValue.toString());
    setCount(normalizedValue);
  }, []);

  return count;
};
