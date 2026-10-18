import { useEffect, useState } from "react";

export function Typewriter({ text, speed = 38 }: { text: string; speed?: number }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(text);
      return;
    }

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setValue(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <span className="typewriter" aria-label={text}>
      <span aria-hidden="true">{value}</span>
    </span>
  );
}
