import { useEffect, useRef } from "react";
import * as THREE from "three";
import { pointerStore } from "../utils/pointerStore";

export function ManuscriptCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (pointerStore.prefersReducedMotion()) {
      return;
    }

    let isDisposed = false;
    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let planeMesh: THREE.Mesh | null = null;
    let texture: THREE.CanvasTexture | null = null;

    // 1. Procedural 18th-century manuscript texture (Opus postumum folio simulation)
    const cvs = document.createElement("canvas");
    cvs.width = 1024;
    cvs.height = 1024;
    const ctx = cvs.getContext("2d");
    if (ctx) {
      // Paper tint base
      ctx.fillStyle = "#F1EEE5";
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine manuscript ink strokes
      ctx.fillStyle = "rgba(24, 24, 22, 0.45)";
      ctx.strokeStyle = "rgba(24, 24, 22, 0.38)";
      ctx.lineWidth = 1.2;

      // Simulated Kurrent cursive lines
      for (let y = 60; y < 980; y += 38) {
        ctx.beginPath();
        let x = 60;
        ctx.moveTo(x, y + Math.sin(x * 0.05) * 3);
        while (x < 940) {
          x += 12 + Math.random() * 28;
          const curveY = y + (Math.random() - 0.5) * 8;
          ctx.lineTo(x, curveY);
        }
        ctx.stroke();

        // Marginalia additions and strikethroughs (Kant's manuscript habit)
        if (y % 114 === 0) {
          ctx.beginPath();
          ctx.moveTo(40, y - 6);
          ctx.lineTo(240, y - 4);
          ctx.stroke();
        }
      }

      // Geometrical schematic sketch (from Convolut VII / transition to physics)
      ctx.beginPath();
      ctx.arc(820, 800, 75, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(745, 800);
      ctx.lineTo(895, 800);
      ctx.moveTo(820, 725);
      ctx.lineTo(820, 875);
      ctx.stroke();

      // Stamp-like archival note
      ctx.font = "italic 16px 'EB Garamond', serif";
      ctx.fillStyle = "rgba(122, 31, 26, 0.4)";
      ctx.fillText("BBAW · Opus postumum Convolut VII · Folio 14b", 80, 1000);
    }

    // 2. WebGL Setup
    try {
      scene = new THREE.Scene();
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 400;

      camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(width, height);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.pointerEvents = "none";
      renderer.domElement.style.opacity = "0.065"; // Very faint backdrop
      container.appendChild(renderer.domElement);

      texture = new THREE.CanvasTexture(cvs);
      texture.generateMipmaps = true;

      // Plane with subtle displacement vertices
      const geometry = new THREE.PlaneGeometry(3.2, 3.2, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
      });

      planeMesh = new THREE.Mesh(geometry, material);
      scene.add(planeMesh);
    } catch {
      // Graceful fallback if WebGL unavailable
      return;
    }

    // 3. Pointer & Intersection Loop
    let targetRotX = 0;
    let targetRotY = 0;
    let targetPosX = 0;
    let targetPosY = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const unsubscribe = pointerStore.subscribe((px, py) => {
      const normX = (px / window.innerWidth) * 2 - 1;
      const normY = -(py / window.innerHeight) * 2 + 1;

      // Restrained parallax: 0.04 units (~2px) and 0.4 degree tilt
      targetPosX = normX * 0.06;
      targetPosY = normY * 0.06;
      targetRotY = normX * 0.015;
      targetRotX = -normY * 0.015;
    });

    const renderLoop = () => {
      if (isDisposed) return;

      if (isVisible && renderer && scene && camera && planeMesh) {
        planeMesh.position.x += (targetPosX - planeMesh.position.x) * 0.06;
        planeMesh.position.y += (targetPosY - planeMesh.position.y) * 0.06;
        planeMesh.rotation.y += (targetRotY - planeMesh.rotation.y) * 0.06;
        planeMesh.rotation.x += (targetRotX - planeMesh.rotation.x) * 0.06;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    const onResize = () => {
      if (!renderer || !camera || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      isDisposed = true;
      observer.disconnect();
      unsubscribe();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer) {
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      texture?.dispose();
      planeMesh?.geometry.dispose();
      if (planeMesh && planeMesh.material instanceof THREE.Material) {
        planeMesh.material.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="manuscript-canvas-layer"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "min(680px, 90vw)",
        height: "680px",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    />
  );
}
