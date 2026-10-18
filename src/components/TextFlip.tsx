import { useState } from "react";

interface TextFlipProps {
  front: string;
  back: string;
  note?: string;
}

export function TextFlip({ front, back, note = "i" }: TextFlipProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className="word-flip"
      aria-label={`${front} (German: ${back})`}
      aria-pressed={flipped}
      onPointerEnter={() => setFlipped(true)}
      onPointerLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <span className={`word-flip__stage ${flipped ? "is-flipped" : ""}`}>
        <span className="word-flip__face word-flip__front">
          {front}
          <sup className="word-flip__note">[{note}]</sup>
        </span>
        <span className="word-flip__face word-flip__back">
          {back}
          <sup className="word-flip__note">[{note}]</sup>
        </span>
      </span>
    </button>
  );
}
