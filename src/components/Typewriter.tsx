import { useEffect, useRef, useState } from "react";
import { pointerStore } from "../utils/pointerStore";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
}

/**
 * Interaction B — type set letter by letter, once.
 * Full text is laid out invisibly underneath so the box never changes height.
 */
export function Typewriter({ text, speed = 40, startDelay = 300 }: TypewriterProps) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (pointerStore.prefersReducedMotion()) {
      setCount(text.length);
      setIsDone(true);
      return;
    }

    const timers: number[] = [];
    let intervalId: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        timers.push(
          window.setTimeout(() => {
            let i = 0;
            intervalId = window.setInterval(() => {
              i += 1;
              setCount(i);
              if (i >= text.length) {
                window.clearInterval(intervalId);
                timers.push(window.setTimeout(() => setIsDone(true), 450));
              }
            }, speed);
          }, startDelay)
        );
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      if (intervalId !== undefined) window.clearInterval(intervalId);
      setCount(0);
      setIsDone(false);
    };
  }, [text, speed, startDelay]);

  return (
    <span ref={containerRef} className="typewriter-wrapper">
      <span className="typewriter-sr">{text}</span>
      <span className="typewriter-placeholder" aria-hidden="true">
        {text}
      </span>
      <span className="typewriter-visible" aria-hidden="true">
        {text.slice(0, count)}
        <span className={`typewriter-cursor ${isDone ? "is-done" : ""}`} />
      </span>
    </span>
  );
}
