import React, { useRef, useState, useEffect } from "react";
import { pointerStore } from "../utils/pointerStore";

interface InkRevealProps {
  children: React.ReactNode;
  isFullyInked?: boolean;
}

export function InkReveal({ children, isFullyInked = false }: InkRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: string; y: string }>({
    x: "50%",
    y: "50%",
  });

  useEffect(() => {
    if (isFullyInked || pointerStore.prefersReducedMotion()) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;
    let isInside = false;

    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!isInside) {
        currentX = targetX;
        currentY = targetY;
        isInside = true;
      }
    };

    const onPointerLeave = () => {
      isInside = false;
    };

    const loop = () => {
      if (isInside) {
        // Smooth ink flow lerp
        currentX += (targetX - currentX) * 0.22;
        currentY += (targetY - currentY) * 0.22;
        container.style.setProperty("--mx", `${currentX.toFixed(1)}px`);
        container.style.setProperty("--my", `${currentY.toFixed(1)}px`);
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFullyInked]);

  return (
    <div
      ref={containerRef}
      className={`ink-reveal ${isFullyInked ? "is-fully-inked" : ""}`}
      tabIndex={0}
      aria-label="Interactive ink revealed passage"
    >
      <div className="ink-reveal__ghost">{children}</div>
      <div className="ink-reveal__ink" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
