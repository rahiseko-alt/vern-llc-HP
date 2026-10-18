import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { pointerStore } from "../utils/pointerStore";

gsap.registerPlugin(SplitText);

interface ProximityLiftProps {
  children: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

interface CharMetric {
  quickY: (value: number) => void;
  quickR: (value: number) => void;
  height: number;
  relCx: number;
  relCy: number;
}

/**
 * Interaction C — Gaussian proximity lift.
 * Char centres are cached (relative to the heading) and only re-measured on resize,
 * so the per-frame work is pure math + quickTo; no layout reads in the pointer path
 * except one heading rect on scroll.
 */
export function ProximityLift({ children, as: Component = "h2", className = "" }: ProximityLiftProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const headingEl = containerRef.current;
    if (!headingEl) return;
    if (!pointerStore.canHoverFine() || pointerStore.prefersReducedMotion()) return;

    let isCancelled = false;
    let split: SplitText | undefined;
    let metrics: CharMetric[] = [];
    let box = { left: 0, top: 0, width: 0, height: 0 };
    let isLifted = false;
    let cleanup: (() => void) | undefined;
    let resizeTimer: number | undefined;

    const measure = () => {
      if (!split) return;
      const chars = split.chars as HTMLElement[];
      gsap.set(chars, { y: 0, rotation: 0 });
      const h = headingEl.getBoundingClientRect();
      box = { left: h.left, top: h.top, width: h.width, height: h.height };
      metrics = chars.map((ch) => {
        const r = ch.getBoundingClientRect();
        return {
          quickY: gsap.quickTo(ch, "y", { duration: 0.4, ease: "power3.out" }),
          quickR: gsap.quickTo(ch, "rotation", { duration: 0.4, ease: "power3.out" }),
          height: r.height,
          relCx: r.left + r.width / 2 - h.left,
          relCy: r.top + r.height / 2 - h.top,
        };
      });
    };

    const settle = () => {
      if (!isLifted) return;
      isLifted = false;
      metrics.forEach((m) => {
        m.quickY(0);
        m.quickR(0);
      });
    };

    document.fonts.ready.then(() => {
      if (isCancelled) return;

      split = SplitText.create(headingEl, { type: "words,chars", aria: "auto" });
      measure();

      const unsubscribe = pointerStore.subscribe((px, py) => {
        if (metrics.length === 0) return;
        const near =
          py >= box.top - 110 &&
          py <= box.top + box.height + 110 &&
          px >= box.left - 90 &&
          px <= box.left + box.width + 90;
        if (!near) {
          settle();
          return;
        }
        isLifted = true;
        const lx = px - box.left;
        const ly = py - box.top;
        for (const m of metrics) {
          const dx = lx - m.relCx;
          const dy = ly - m.relCy;
          const sx = Math.max(m.height * 1.85, 46);
          const sy = Math.max(m.height * 1.15, 30);
          const influence = Math.exp(-((dx * dx) / (sx * sx) + (dy * dy) / (sy * sy)));
          const k = influence > 0.004 ? influence : 0;
          m.quickY(-m.height * 0.28 * k);
          m.quickR((-dx / sx) * 5.4 * k);
        }
      });

      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(measure, 150);
      };
      const onScroll = () => {
        const h = headingEl.getBoundingClientRect();
        box.left = h.left;
        box.top = h.top;
      };

      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      headingEl.addEventListener("pointerleave", settle);

      cleanup = () => {
        unsubscribe();
        window.clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
        headingEl.removeEventListener("pointerleave", settle);
      };
    });

    return () => {
      isCancelled = true;
      cleanup?.();
      split?.revert();
    };
  }, []);

  return (
    <Component ref={containerRef} className={`proximity-lift ${className}`}>
      {children}
    </Component>
  );
}
