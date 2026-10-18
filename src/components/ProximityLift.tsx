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
  el: HTMLElement;
  quickY: (value: number) => void;
  quickR: (value: number) => void;
  width: number;
  height: number;
  // Offset relative to heading container
  relCx: number;
  relCy: number;
}

export function ProximityLift({
  children,
  as: Component = "h2",
  className = "",
}: ProximityLiftProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const headingEl = containerRef.current;
    if (!headingEl) return;

    if (!pointerStore.canHoverFine() || pointerStore.prefersReducedMotion()) {
      return;
    }

    let isCancelled = false;
    let split: SplitText | undefined;
    let metrics: CharMetric[] = [];
    let headingBox = { left: 0, top: 0, width: 0, height: 0 };

    const measureMetrics = () => {
      if (!headingEl) return;
      const hRect = headingEl.getBoundingClientRect();
      headingBox = {
        left: hRect.left,
        top: hRect.top,
        width: hRect.width,
        height: hRect.height,
      };

      if (!split || !split.chars) return;
      metrics = (split.chars as HTMLElement[]).map((ch) => {
        const cRect = ch.getBoundingClientRect();
        return {
          el: ch,
          quickY: gsap.quickTo(ch, "y", { duration: 0.38, ease: "power3.out" }),
          quickR: gsap.quickTo(ch, "rotation", {
            duration: 0.38,
            ease: "power3.out",
          }),
          width: cRect.width,
          height: cRect.height,
          relCx: cRect.left + cRect.width / 2 - hRect.left,
          relCy: cRect.top + cRect.height / 2 - hRect.top,
        };
      });
    };

    document.fonts.ready.then(() => {
      if (isCancelled || !containerRef.current) return;

      split = SplitText.create(headingEl, {
        type: "words,chars",
        aria: "auto",
      });

      measureMetrics();

      const unsubscribe = pointerStore.subscribe((px, py) => {
        if (!headingEl || metrics.length === 0) return;

        // Bounding check: only compute Gaussian if pointer is within vertical range
        const isNearVertical =
          py >= headingBox.top - 120 && py <= headingBox.top + headingBox.height + 120;
        const isNearHorizontal =
          px >= headingBox.left - 100 && px <= headingBox.left + headingBox.width + 100;

        if (!isNearVertical || !isNearHorizontal) {
          metrics.forEach((m) => {
            m.quickY(0);
            m.quickR(0);
          });
          return;
        }

        // Relative pointer position inside heading container
        const localPx = px - headingBox.left;
        const localPy = py - headingBox.top;

        metrics.forEach((m) => {
          const dx = localPx - m.relCx;
          const dy = localPy - m.relCy;

          const sx = Math.max(m.height * 1.85, 46);
          const sy = Math.max(m.height * 1.15, 30);
          const influence = Math.exp(-((dx * dx) / (sx * sx) + (dy * dy) / (sy * sy)));

          if (influence > 0.005) {
            m.quickY(-m.height * 0.28 * influence);
            m.quickR((-dx / sx) * 5.4 * influence);
          } else {
            m.quickY(0);
            m.quickR(0);
          }
        });
      });

      const handleResize = () => {
        measureMetrics();
      };

      const handleScroll = () => {
        if (!headingEl) return;
        const hRect = headingEl.getBoundingClientRect();
        headingBox.left = hRect.left;
        headingBox.top = hRect.top;
      };

      window.addEventListener("resize", handleResize, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });

      const onPointerLeave = () => {
        metrics.forEach((m) => {
          m.quickY(0);
          m.quickR(0);
        });
      };
      headingEl.addEventListener("pointerleave", onPointerLeave);

      return () => {
        unsubscribe();
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
        headingEl.removeEventListener("pointerleave", onPointerLeave);
      };
    });

    return () => {
      isCancelled = true;
      split?.revert();
    };
  }, []);

  return (
    <Component
      ref={containerRef}
      className={`proximity-lift ${className}`}
    >
      {children}
    </Component>
  );
}
