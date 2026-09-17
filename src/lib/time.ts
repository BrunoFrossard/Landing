/**
 * Utilitários de fuso horário sem dependências.
 * Converte uma data "de parede" em um fuso IANA para um instante UTC,
 * de modo que a contagem funcione igual para quem acessa de qualquer lugar.
 */

type WallTime = { year: number; month: number; day: number; hour: number; minute: number };

function offsetMs(instant: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(instant));

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - Math.floor(instant / 1000) * 1000;
}

export function zonedTimeToUtc(wall: WallTime, timeZone: string): Date {
  const guess = Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute);
  // Duas passagens resolvem mudanças de horário de verão perto da data.
  const first = guess - offsetMs(guess, timeZone);
  const second = guess - offsetMs(first, timeZone);
  return new Date(second);
}

export type Remaining =
  | { isOpen: true }
  | { isOpen: false; days: number; hours: number; minutes: number };

export function getRemaining(now: number, target: number): Remaining {
  const diff = target - now;
  if (diff <= 0) return { isOpen: true };
  // Arredonda para cima: nunca mostra 00:00:00 antes da hora.
  const totalMinutes = Math.ceil(diff / 60_000);
  return {
    isOpen: false,
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
  };
}

export function pluralize(value: number, one: string, many: string) {
  return value === 1 ? one : many;
}
