"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";
import { getRemaining, pluralize, zonedTimeToUtc } from "@/lib/time";
import { cn } from "@/lib/utils";

const TARGET = zonedTimeToUtc(site.opening.date, site.opening.timeZone).getTime();
const TICK_MS = 15_000;

/**
 * Relógio compartilhado, alinhado a cada 15 s (sem segundos na tela, sem ruído visual).
 * Para testar o estado pós-abertura: `?simular=2026-10-16T12:00:00-03:00`.
 */
function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, TICK_MS);
  const onVisible = () => document.visibilityState === "visible" && onTick();
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onVisible);
  };
}

function getNow() {
  const simulated = new URLSearchParams(window.location.search).get("simular");
  if (simulated) {
    const parsed = Date.parse(simulated);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return Math.floor(Date.now() / TICK_MS) * TICK_MS;
}

const getServerNow = () => null;

const two = (n: number) => String(n).padStart(2, "0");

export function Countdown({ className }: { className?: string }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);

  if (now === null) {
    return (
      <div className={cn("ticket", className)} aria-hidden="true">
        <CountdownGrid days="––" hours="––" minutes="––" />
      </div>
    );
  }

  const remaining = getRemaining(now, TARGET);

  if (remaining.isOpen) {
    return (
      <div className={cn("ticket px-6 py-7 text-center", className)} role="status">
        <p className="font-display text-[clamp(1.5rem,1rem+2vw,2.4rem)] font-medium uppercase tracking-[0.02em] text-ribalta">
          {site.opening.openedMessage}
        </p>
      </div>
    );
  }

  const { days, hours, minutes } = remaining;
  const spoken = `Faltam ${days} ${pluralize(days, "dia", "dias")}, ${hours} ${pluralize(hours, "hora", "horas")} e ${minutes} ${pluralize(minutes, "minuto", "minutos")} para a abertura, em ${site.opening.labelLong}, horário de São Paulo.`;

  return (
    <div className={cn("ticket", className)} role="timer" aria-label={spoken}>
      <CountdownGrid
        days={two(days)}
        hours={two(hours)}
        minutes={two(minutes)}
        labels={[pluralize(days, "dia", "dias"), pluralize(hours, "hora", "horas"), pluralize(minutes, "minuto", "minutos")]}
      />
    </div>
  );
}

function CountdownGrid({
  days,
  hours,
  minutes,
  labels = ["dias", "horas", "minutos"],
}: {
  days: string;
  hours: string;
  minutes: string;
  labels?: string[];
}) {
  const cells = [days, hours, minutes];
  return (
    <div className="grid grid-cols-3" aria-hidden="true">
      {cells.map((value, i) => (
        <div key={labels[i] + i} className={cn("flex flex-col items-center px-3 py-5 sm:px-8 sm:py-6", i > 0 && "border-l border-ouro/35")}>
          <span className="countdown-value">{value}</span>
          <span className="mt-2 text-[0.75rem] tracking-[0.12em] text-fumo">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
