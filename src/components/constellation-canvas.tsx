"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide "infestation" mesh — ONE continuous black field fixed to the
 * viewport, painted in front of every section (design-system.md — "Motivo de
 * constelação — infestação"). Mounted once in layout.tsx.
 *
 * v4 folds in the richer look the user picked from the 21st.dev
 * "constellation-field" component, ported natively (no iframe, no CDN scripts):
 *   - nodes pulse (sine) and carry a soft halo → they breathe / glow
 *   - link opacity ramps 0.22 → ~0.77 with proximity
 *   - subtle pointer gravity: nodes within POINTER_RADIUS drift gently toward
 *     the cursor
 * Kept from our own version:
 *   - scroll-velocity boost on drift speed, decaying back to base drift
 *   - fixed / full-viewport / pointer-events-none / z-40
 *   - prefers-reduced-motion → single static frame, no rAF
 *
 * Colour: preto (`0,0,0`) para nós e linhas — o site foi invertido pra fundo
 * branco em 2026-08-27, então os "traços" agora são pretos. Coral segue
 * exclusivo do "+" do wordmark.
 */

const MESH_RGB = "0,0,0"; // preto — nós E linhas, sobre o fundo branco
const FIELD_OPACITY = 0.34; // preto sobre branco tem muito mais contraste que o ash-sobre-preto de antes
const LINK_DIST = 160;
const POINTER_RADIUS = 200; // outer reach of the cursor's pull
const POINTER_INNER = 70; // nodes never get pulled tighter than this — no knot
const POINTER_PULL = 0.0022; // very gentle: nodes gather a little, not a lot

export function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let rafId = 0;

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function buildNodes() {
      // Area-based, tuned to the reference's ~40 (mobile) / ~85 (desktop).
      const count = Math.max(40, Math.min(95, Math.round((w * h) / 18000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.15, 0.15),
        r: rand(1.8, 4.2),
      }));
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    }

    // --- scroll-reactive speed boost ---
    let lastScrollY = window.scrollY;
    let boost = 0; // 0 = base drift, grows with scroll, decays over time
    function onScroll() {
      const y = window.scrollY;
      const delta = Math.abs(y - lastScrollY);
      lastScrollY = y;
      boost = Math.min(boost + delta * 0.045, 9);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- subtle pointer gravity ---
    // Only pulls while the cursor is *moving*: `pointerPower` spikes to 1 on
    // mousemove and decays every frame, so a cursor left resting on the page
    // stops attracting and the nodes drift back apart (no permanent knot).
    let pointerX = -10000;
    let pointerY = -10000;
    let pointerPower = 0;
    function onMove(e: MouseEvent) {
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerPower = 1;
    }
    function onLeave() {
      pointerX = -10000;
      pointerY = -10000;
      pointerPower = 0;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    function step() {
      boost *= 0.94; // decay back to base drift
      pointerPower *= 0.9; // gravity fades ~0.3s after the cursor stops moving
      const speedMul = 1 + boost;
      const now = performance.now();
      const pull = POINTER_PULL * pointerPower;

      ctx!.clearRect(0, 0, w, h);

      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx * speedMul;
          n.y += n.vy * speedMul;
          // Bounce off edges (not wrap): keeps a fixed full-viewport field
          // evenly populated instead of leaving gaps as nodes drift off.
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          n.x = Math.max(0, Math.min(w, n.x));
          n.y = Math.max(0, Math.min(h, n.y));

          if (pull > 0.0002) {
            const pdx = n.x - pointerX;
            const pdy = n.y - pointerY;
            const pd2 = pdx * pdx + pdy * pdy;
            // Pull only in the ring between POINTER_INNER and POINTER_RADIUS:
            // nodes drift a little toward the cursor but never collapse into a
            // knot, since inside POINTER_INNER there's no force at all.
            if (
              pd2 < POINTER_RADIUS * POINTER_RADIUS &&
              pd2 > POINTER_INNER * POINTER_INNER
            ) {
              n.x -= pdx * pull;
              n.y -= pdy * pull;
            }
          }
        }
      }

      // Links first so the nodes sit crisp on top.
      ctx!.lineWidth = 1;
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = 0.22 + (1 - dist / LINK_DIST) * 0.55;
            ctx!.strokeStyle = `rgba(${MESH_RGB},${alpha.toFixed(3)})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[a].x, nodes[a].y);
            ctx!.lineTo(nodes[b].x, nodes[b].y);
            ctx!.stroke();
          }
        }
      }

      // Nodes: pulsing core + soft halo so they read at retina scale.
      for (const n of nodes) {
        const pulse = 0.78 + Math.sin(now * 0.001 + n.x) * 0.22;
        ctx!.fillStyle = `rgba(${MESH_RGB},${(pulse * 0.28).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * 2.4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(${MESH_RGB},${pulse.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduceMotion) rafId = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);
    resize();
    step();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[40] h-full w-full"
      style={{ opacity: FIELD_OPACITY }}
      aria-hidden="true"
    />
  );
}
