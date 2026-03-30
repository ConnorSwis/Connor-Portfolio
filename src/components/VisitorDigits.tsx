import { formatCounter } from "../hooks/useVisitorCounter";

type VisitorDigitsProps = {
  value: number;
};

export function VisitorDigits({ value }: VisitorDigitsProps) {
  const digits = formatCounter(value).split("");

  return (
    <div aria-label="Visitor count" className="hit-counter" role="status">
      {digits.map((digit, index) => (
        <span key={`${digit}-${index}`}>{digit}</span>
      ))}
    </div>
  );
}
