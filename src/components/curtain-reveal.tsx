"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Seção cujas cortinas se abrem ao entrar na tela (uma vez).
 * Sem JS ou com movimento reduzido, as cortinas já aparecem abertas (ver globals.css).
 */
export function CurtainReveal({ id, labelledBy, className, children }: { id: string; labelledBy: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-open");
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} className={cn("finale", className)}>
      <div className="finale-light" aria-hidden="true" />
      <div className="curtain curtain--left velvet" aria-hidden="true" />
      <div className="curtain curtain--right velvet" aria-hidden="true" />
      <div className="finale-blade blade" aria-hidden="true" />
      <div className="finale-content">{children}</div>
    </section>
  );
}
