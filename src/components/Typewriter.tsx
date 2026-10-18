import { useEffect, useState, useRef } from "react";
import { pointerStore } from "../utils/pointerStore";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
}

export function Typewriter({
  text,
  speed = 32,
  startDelay = 200,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (pointerStore.prefersReducedMotion()) {
      setDisplayText(text);
      setIsDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          observer.disconnect();

          const timeoutId = window.setTimeout(() => {
            let i = 0;
            const intervalId = window.setInterval(() => {
              i += 1;
              setDisplayText(text.slice(0, i));
              if (i >= text.length) {
                window.clearInterval(intervalId);
                window.setTimeout(() => setIsDone(true), 450);
              }
            }, speed);
          }, startDelay);

          return () => window.clearTimeout(timeoutId);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [text, speed, startDelay]);

  return (
    <span ref={containerRef} className="typewriter-wrapper" aria-label={text}>
      <span className="typewriter-placeholder" aria-hidden="true">
        {text}
      </span>
      <span className="typewriter-visible" aria-hidden="true">
        {displayText}
        <span className={`typewriter-cursor ${isDone ? "is-done" : ""}`} />
      </span>
    </span>
  );
}
