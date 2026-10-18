import React, { useEffect, useRef, useState } from "react";
import { pointerStore } from "../utils/pointerStore";

interface InkRevealProps {
  children: React.ReactNode;
  isFullyInked?: boolean;
}

/**
 * Interaction D — ink settles near the pointer (no light, no background change).
 * Touch devices, reduced motion and keyboard focus get the fully inked text.
 * The rAF loop only runs while the ink position is still moving.
 */
export function InkReveal({ children, isFullyInked = false }: InkRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [noHover, setNoHover] = useState(false);

  useEffect(() => {
    setNoHover(!pointerStore.canHoverFine() || pointerStore.prefersReducedMotion());
  }, []);

  const fullyInked = isFullyInked || noHover;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || fullyInked) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf = 0;
    let running = false;
    let entered = false;

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      el.style.setProperty("--mx", `${cx.toFixed(1)}px`);
      el.style.setProperty("--my", `${cy.toFixed(1)}px`);
      if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!entered) {
        cx = tx;
        cy = ty;
        entered = true;
        el.classList.add("is-inking");
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      entered = false;
      el.classList.remove("is-inking");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [fullyInked]);

  return (
    <div
      ref={containerRef}
      className={`ink-reveal ${fullyInked ? "is-fully-inked" : ""}`}
      tabIndex={fullyInked ? undefined : 0}
    >
      <div className="ink-reveal__ghost">{children}</div>
      <div className="ink-reveal__ink" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
