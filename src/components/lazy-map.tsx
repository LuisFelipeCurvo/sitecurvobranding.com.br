"use client";

import { useEffect, useRef, useState } from "react";

/** iframe do Google Maps que só monta quando o rodapé chega perto da tela —
 *  o embed puxa ~400KB de JS do Google, e `loading="lazy"` não segurava. */
export function LazyMap({ src, title, className }: { src: string; title: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-full w-full">
      {show && <iframe src={src} title={title} tabIndex={-1} className={className} />}
    </div>
  );
}
