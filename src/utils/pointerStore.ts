type PointerListener = (x: number, y: number) => void;

class PointerStore {
  private x = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  private y = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
  private listeners = new Set<PointerListener>();
  private isInitialized = false;
  private isTicking = false;
  private isPageVisible = true;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    window.addEventListener(
      "pointermove",
      (e) => {
        this.x = e.clientX;
        this.y = e.clientY;
        this.scheduleNotify();
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", () => {
      this.isPageVisible = document.visibilityState === "visible";
    });
  }

  private scheduleNotify() {
    if (!this.isTicking && this.isPageVisible) {
      this.isTicking = true;
      requestAnimationFrame(() => {
        this.isTicking = false;
        if (!this.isPageVisible) return;
        this.listeners.forEach((fn) => fn(this.x, this.y));
      });
    }
  }

  public getPointer(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public subscribe(fn: PointerListener): () => void {
    this.listeners.add(fn);
    fn(this.x, this.y);
    return () => {
      this.listeners.delete(fn);
    };
  }

  public canHoverFine(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  public prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}

export const pointerStore = new PointerStore();
