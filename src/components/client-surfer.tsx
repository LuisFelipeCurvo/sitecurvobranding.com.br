"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { Play } from "lucide-react";

interface ClientItem {
  name: string;
  year: string;
}

const CLIENTS: ClientItem[] = [
  { name: "Fernando Perez", year: "2020" },
  { name: "Haru Oriental", year: "2014" },
  { name: "Forz Gym", year: "2024" },
  { name: "Grupo São Benedito", year: "2018" },
  { name: "Azuri", year: "2022" },
  { name: "Belflora", year: "2020" },
];

// Scroll budget per card — the section is exactly this tall × card count,
// so the scroll is FINITE: once the last card settles, the pin releases and
// normal page scroll continues. No looping, no duplicated items.
const SCROLL_PER_ITEM = 480;
// Kept shallow on purpose: counter-rotating a child to cancel a steep
// rotateY introduces a keystone/skew artifact from the mismatched transform
// pivot (reads as clipped text) — at this shallow an angle the card face is
// close enough to flat that text sits directly on it, untouched, no
// counter-rotation needed at all.
const ROTATE_Y = -8; // deg — fixed "shelf" tilt shared by every card
const LAST_INDEX = CLIENTS.length - 1;

const GEOMETRY = {
  desktop: { cardW: 220, cardH: 300, stepX: 230, stepY: -68, stepZ: -260 },
  // Scaled down so the full tilted stack — and every card's caption — stays
  // inside a narrow viewport instead of running past the right edge.
  // stepX ≥ cardW so consecutive cards never overlap into each other's
  // caption area — a front card correctly covering the tail of a back card's
  // TEXT (not just its empty edge) reads as broken, not as intentional
  // "editorial overlap."
  mobile: { cardW: 150, cardH: 200, stepX: 168, stepY: -44, stepZ: -170 },
};

function useSurferGeometry() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile ? GEOMETRY.mobile : GEOMETRY.desktop;
}

/**
 * Finite scroll-driven 3D card surf for the client roster — adapted from the
 * reference "CollectionSurfer" component. Differences from the reference:
 *  - Finite: tracks THIS section's own scroll progress (via a local ref),
 *    not the whole page's scrollY — no modulo loop, no duplicated item list.
 *  - Placeholder cards (tonal black/ash, play glyph) instead of photography —
 *    no real client videos yet.
 *  - Caption (client name + year) is counter-rotated back to face the camera
 *    so it stays legible inside the tilted 3D wall.
 */
export function ClientSurfer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const geo = useSurferGeometry();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.2,
  });

  const x = useTransform(smooth, [0, 1], [0, -LAST_INDEX * geo.stepX]);
  const y = useTransform(smooth, [0, 1], [0, -LAST_INDEX * geo.stepY]);
  const z = useTransform(smooth, [0, 1], [0, -LAST_INDEX * geo.stepZ]);

  const mouseX = useMotionValue(-10000);
  const mouseY = useMotionValue(-10000);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${CLIENTS.length * SCROLL_PER_ITEM}px` }}
      className="relative"
    >
      <div
        className="sticky top-0 z-[3] flex h-screen w-full items-center justify-center overflow-hidden"
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }}
        onMouseLeave={() => {
          mouseX.set(-10000);
          mouseY.set(-10000);
        }}
      >
        <div className="pointer-events-none absolute left-6 top-8 sm:left-14 sm:top-9">
          <p className="mb-3 text-xs uppercase tracking-[0.14em] text-ash">
            &gt;&gt; Cases
          </p>
          <h2 className="text-[clamp(28px,5vw,60px)] font-medium uppercase leading-[0.95] tracking-[-0.02em]">
            +1000 marcas
            <br />
            construídas
            <span className="ml-2 align-top text-[0.35em] tabular-nums text-ash">
              ({CLIENTS.length})
            </span>
          </h2>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-6 text-xs uppercase tracking-[0.14em] text-ash sm:bottom-9 sm:right-14">
          Role para navegar
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "2000px", perspectiveOrigin: "22% 25%" }}
        >
          <motion.div
            className="relative h-0 w-0"
            style={{ x, y, z, transformStyle: "preserve-3d" }}
          >
            {CLIENTS.map((client, i) => (
              <SurferCard
                key={client.name}
                client={client}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
                geo={geo}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SurferCard({
  client,
  index,
  mouseX,
  mouseY,
  geo,
}: {
  client: ClientItem;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  geo: { cardW: number; cardH: number; stepX: number; stepY: number; stepZ: number };
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const distance = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!ref.current) return 400;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.hypot(Number(mx) - cx, Number(my) - cy);
  });
  const targetScale = useTransform(distance, [0, 380], [1.32, 1]);
  const scale = useSpring(targetScale, {
    stiffness: 260,
    damping: 22,
    mass: 0.4,
  });

  const transform = useTransform(scale, (s) => {
    const baseX = index * geo.stepX;
    const baseY = index * geo.stepY;
    const baseZ = index * geo.stepZ;
    return `translate3d(${baseX}px, ${baseY}px, ${baseZ}px) rotateY(${ROTATE_Y}deg) scale(${s})`;
  });

  return (
    <motion.div
      ref={ref}
      className="absolute border border-ash/40 bg-black/[0.055]"
      style={{
        width: geo.cardW,
        height: geo.cardH,
        transform,
        transformStyle: "preserve-3d",
        // Explicit paint order matching the intended "front" card — browsers
        // don't reliably z-sort preserve-3d siblings on 2D-projected overlap,
        // so without this the next card can paint over this one's caption.
        zIndex: CLIENTS.length - index,
      }}
    >
      <span className="absolute -top-7 left-0 font-mono text-xs text-ash">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.04)_0px,rgba(0,0,0,0.04)_1px,transparent_1px,transparent_3px)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ghost/60">
          <Play
            size={16}
            strokeWidth={1.5}
            className="ml-[2px] fill-ghost text-ghost"
          />
        </span>
      </div>

      {/* Stacked, not side-by-side, and allowed to wrap to 2 lines: a long
          name (e.g. "Grupo São Benedito") must never get clipped against the
          year, regardless of card width. */}
      <span className="absolute inset-x-2 bottom-2 flex flex-col gap-1 text-[10px] uppercase leading-tight sm:text-xs">
        <span className="break-words">{client.name}</span>
        <span className="text-ash">{client.year}</span>
      </span>
    </motion.div>
  );
}
