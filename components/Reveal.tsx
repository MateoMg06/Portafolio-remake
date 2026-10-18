"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  /** Posición en el escalonado: cada paso suma 70ms de retraso. */
  i?: number;
  className?: string;
  children: ReactNode;
};

// Aparece una sola vez cuando entra en pantalla.
export default function Reveal({ as: Tag = "div", i = 0, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--i": i } as CSSProperties}>
      {children}
    </Tag>
  );
}
