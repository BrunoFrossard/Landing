"use client";

import { useEffect, useState } from "react";
import { DecoStar } from "@/components/ornaments";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Navegação flutuante em forma de bambolina (a sanefa no topo do palco),
 * adaptada da barra suspensa do PrismaHero. Marca tipográfica provisória, sem recriar o logo.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const links = site.nav.filter((item) => !("isTicket" in item && item.isTicket));
  const ticket = site.nav.find((item) => "isTicket" in item && item.isTicket);

  useEffect(() => {
    const sections = site.nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const wordmark = (
    <a href="#topo" className="group inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-display text-[clamp(0.76rem,3.4vw,0.95rem)] font-medium uppercase tracking-[0.1em] text-marfim sm:tracking-[0.16em]" onClick={() => setMenuOpen(false)}>
      <DecoStar className="size-2.5 text-ouro transition-colors group-hover:text-ribalta" />
      <span>Cabaret da Cecília</span>
      <span className="sr-only">, voltar ao início</span>
    </a>
  );

  return (
    <header className="pelmet stage-fade" style={{ "--d": "0.9s" } as React.CSSProperties}>
      {/* Desktop e tablet: links simétricos em torno da marca, como um brasão de proscênio */}
      <nav aria-label="Principal" className="hidden h-[var(--header-h)] items-center justify-between gap-2 px-6 pb-1 md:flex lg:px-8">
        <div className="flex flex-1 items-center gap-4 lg:gap-7">
          {links.slice(0, 2).map((item) => (
            <a key={item.href} href={item.href} className="nav-link" aria-current={current === item.id ? "true" : undefined}>
              {item.label}
            </a>
          ))}
        </div>
        {wordmark}
        <div className="flex flex-1 items-center justify-end gap-4 lg:gap-7">
          {links.slice(2).map((item) => (
            <a key={item.href} href={item.href} className="nav-link" aria-current={current === item.id ? "true" : undefined}>
              {item.label}
            </a>
          ))}
          {ticket && (
            <a href={ticket.href} className="nav-ticket" aria-label={`Abertura em ${site.opening.labelLong}`}>
              {ticket.label}
            </a>
          )}
        </div>
      </nav>

      {/* Mobile: marca + menu compacto */}
      <div className="md:hidden">
        <div className="flex h-[var(--header-h)] items-center justify-between gap-3 pb-1 pl-4 pr-2">
          {wordmark}
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2.5 px-3 text-[0.8125rem] tracking-[0.06em] text-marfim"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Fechar" : "Menu"}
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span className={cn("absolute left-0 top-0 h-px w-full bg-ouro transition-transform duration-300", menuOpen && "translate-y-[5px] rotate-45")} />
              <span className={cn("absolute bottom-0 left-0 h-px w-full bg-ouro transition-transform duration-300", menuOpen && "-translate-y-[4px] -rotate-45")} />
            </span>
          </button>
        </div>
        <nav id="menu-mobile" aria-label="Principal" hidden={!menuOpen} className="px-4 pb-6">
          <ul className="grid border-t border-ouro/25">
            {site.nav.map((item) => (
              <li key={item.href} className="border-b border-ouro/15">
                <a
                  href={item.href}
                  className="flex min-h-13 items-center justify-between py-3 font-display text-[1.35rem]"
                  onClick={() => setMenuOpen(false)}
                >
                  {"isTicket" in item && item.isTicket ? `Abertura · ${item.label}` : item.label}
                  <DecoStar className="size-2.5 text-ouro" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
