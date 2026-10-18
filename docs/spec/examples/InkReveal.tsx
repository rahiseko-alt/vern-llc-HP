import { CSSProperties, PointerEvent, useRef } from "react";

export function InkReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      className="ink-reveal"
      style={{ "--mx": "50%", "--my": "50%" } as CSSProperties}
    >
      <div className="ink-reveal__ghost">{children}</div>
      <div className="ink-reveal__ink" aria-hidden="true">{children}</div>
    </div>
  );
}
