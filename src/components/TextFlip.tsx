import { useRef, useState, type PointerEvent } from "react";

interface TextFlipProps {
  front: string;
  back: string;
  note?: string;
}

/**
 * Interaction A — Semantic 3D word flip.
 * Mouse: hover. Keyboard: focus. Touch: tap toggles.
 * (Pointer type is tracked so a tap doesn't fire enter→click and cancel itself.)
 */
export function TextFlip({ front, back, note }: TextFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const lastPointerType = useRef<string>("mouse");

  const onEnter = (e: PointerEvent) => {
    lastPointerType.current = e.pointerType;
    if (e.pointerType === "mouse") setFlipped(true);
  };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") setFlipped(false);
  };
  const onDown = (e: PointerEvent) => {
    lastPointerType.current = e.pointerType;
  };
  const onClick = () => {
    if (lastPointerType.current !== "mouse") setFlipped((v) => !v);
  };

  return (
    <span className="word-flip-wrap">
      <button
        type="button"
        className="word-flip"
        aria-label={`${front}（${back}）`}
        aria-pressed={flipped}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onPointerDown={onDown}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        onClick={onClick}
      >
        <span className={`word-flip__stage ${flipped ? "is-flipped" : ""}`} aria-hidden="true">
          <span className="word-flip__face word-flip__front">{front}</span>
          <span className="word-flip__face word-flip__back">
            <span className="word-flip__latin">{back}</span>
          </span>
        </span>
      </button>
      {note && <sup className="word-flip__note">{note}</sup>}
    </span>
  );
}
