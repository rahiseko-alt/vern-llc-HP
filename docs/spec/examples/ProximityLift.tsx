import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function ProximityLift({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce) return;

    let split: SplitText | undefined;
    let cleanupPointer: (() => void) | undefined;

    document.fonts.ready.then(() => {
      if (!ref.current) return;
      split = SplitText.create(ref.current, { type: "chars", aria: "auto" });
      const chars = split.chars as HTMLElement[];

      const setters = chars.map((ch) => ({
        y: gsap.quickTo(ch, "y", { duration: 0.38, ease: "power3.out" }),
        r: gsap.quickTo(ch, "rotation", { duration: 0.38, ease: "power3.out" }),
      }));

      const onMove = (e: PointerEvent) => {
        chars.forEach((ch, i) => {
          const r = ch.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;

          const sx = Math.max(r.height * 1.8, 40);
          const sy = Math.max(r.height * 1.15, 28);
          const influence = Math.exp(-((dx * dx) / (sx * sx) + (dy * dy) / (sy * sy)));

          setters[i].y(-r.height * 0.28 * influence);
          setters[i].r((-dx / sx) * 5 * influence);
        });
      };

      const onLeave = () => {
        setters.forEach((s) => {
          s.y(0);
          s.r(0);
        });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanupPointer = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      cleanupPointer?.();
      split?.revert();
    };
  }, []);

  return <h2 ref={ref} className="proximity-lift">{children}</h2>;
}
