import { useState } from "react";
import "./text-effects.css";

type TextFlipProps = {
  front: string;
  back: string;
};

export function TextFlip({ front, back }: TextFlipProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      className="word-flip"
      type="button"
      aria-label={`${front} / ${back}`}
      aria-pressed={flipped}
      onPointerEnter={() => setFlipped(true)}
      onPointerLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      <span className={`word-flip__stage ${flipped ? "is-flipped" : ""}`}>
        <span className="word-flip__face word-flip__front">{front}</span>
        <span className="word-flip__face word-flip__back">{back}</span>
      </span>
    </button>
  );
}
