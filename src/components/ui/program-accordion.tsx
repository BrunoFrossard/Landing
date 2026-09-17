"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ProgramMotifArt } from "@/components/ornaments";
import type { ProgramItem } from "@/data/site";

/**
 * Cartões de programa "Em cena" (adaptado do Interactive Image Accordion, 21st.dev).
 * - Desktop: faixas horizontais; a ativa se expande. Hover com intenção (atraso curto), clique e teclado.
 * - Mobile: acordeão vertical, só toque, sem dependência de hover.
 * - Padrão ARIA de acordeão: botões com aria-expanded + regiões; setas movem o foco.
 */

const CARD_BACKGROUNDS: Record<ProgramItem["id"], string> = {
  jazz: "radial-gradient(120% 85% at 85% 5%, rgb(182 144 77 / 0.3), rgb(182 144 77 / 0) 60%), #150b07",
  teatro: "radial-gradient(90% 70% at 50% 110%, rgb(241 201 122 / 0.22), rgb(241 201 122 / 0) 65%), linear-gradient(180deg, #3f0610, #6f0c1f 60%, #2a040b)",
  drag: "radial-gradient(80% 70% at 50% 85%, rgb(241 201 122 / 0.26), rgb(241 201 122 / 0) 65%), #26060e",
  burlesco: "radial-gradient(100% 80% at 50% 100%, rgb(142 16 39 / 0.75), rgb(142 16 39 / 0) 70%), #3a0510",
  pole: "radial-gradient(40% 90% at 78% 50%, rgb(241 201 122 / 0.14), rgb(241 201 122 / 0) 70%), #0b0908",
  djs: "radial-gradient(90% 90% at 70% 30%, rgb(142 16 39 / 0.42), rgb(142 16 39 / 0) 65%), #0e0909",
};

const HOVER_INTENT_MS = 140;

export function ProgramAccordion({ items, defaultIndex = 0 }: { items: readonly ProgramItem[]; defaultIndex?: number }) {
  const [active, setActive] = useState(defaultIndex);
  const baseId = useId();
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimer = useRef<number | undefined>(undefined);

  const clearHover = useCallback(() => window.clearTimeout(hoverTimer.current), []);
  useEffect(() => clearHover, [clearHover]);

  const onPointerEnter = (index: number, event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 768px)").matches) return;
    clearHover();
    hoverTimer.current = window.setTimeout(() => setActive(index), HOVER_INTENT_MS);
  };

  const onKeyDown = (index: number, event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = items.length - 1;
    const map: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in map)) return;
    event.preventDefault();
    triggers.current[map[event.key]]?.focus();
  };

  return (
    <div className="program" onPointerLeave={clearHover}>
      {items.map((item, index) => {
        const isActive = index === active;
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div
            key={item.id}
            className="program-card"
            data-active={isActive}
            style={{ "--card-bg": CARD_BACKGROUNDS[item.id] } as React.CSSProperties}
            onPointerEnter={(event) => onPointerEnter(index, event)}
          >
            <div className="program-art" aria-hidden="true">
              <ProgramMotifArt motif={item.motif} />
              <div className="program-art-shade" />
            </div>

            <h3 className="m-0">
              <button
                ref={(node) => {
                  triggers.current[index] = node;
                }}
                id={triggerId}
                type="button"
                className="program-trigger"
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => {
                  clearHover();
                  setActive(index);
                }}
                onKeyDown={(event) => onKeyDown(index, event)}
              >
                <span className="program-trigger-label">{item.title}</span>
                <span className="program-trigger-icon" aria-hidden="true" />
              </button>
            </h3>

            <div id={panelId} role="region" aria-labelledby={triggerId} className="program-panel" inert={!isActive}>
              <div className="program-panel-inner">
                <div className="program-panel-body">
                  <p className="program-title-large" aria-hidden="true">
                    {item.title}
                  </p>
                  <p className="program-line">{item.line}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
