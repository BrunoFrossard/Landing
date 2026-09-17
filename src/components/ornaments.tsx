import type { ProgramMotif } from "@/data/site";
import { cn } from "@/lib/utils";

/* Ornamentos locais em SVG. Todos decorativos (aria-hidden). */

export function DecoStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("inline-block", className)} fill="currentColor">
      <path d="M12 0l1.35 8.4L24 12l-10.65 3.6L12 24l-1.35-8.4L0 12l10.65-3.6z" />
      <path d="M12 5.2l.8 4.8 4.8.8-4.8.8-.8 4.8-.8-4.8-4.8-.8 4.8-.8z" transform="rotate(45 12 12)" opacity="0.7" />
    </svg>
  );
}

/** Lâmpadas de letreiro desenhadas ao longo do arco (traço pontilhado de largura constante). */
export function ArchBulbs() {
  return (
    <svg className="arch-bulbs" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 100 V26 A50 26 0 0 1 100 26 V100" />
    </svg>
  );
}

/** Arredonda coordenadas: evita diferenças de ponto flutuante entre motores JS na hidratação. */
const r2 = (n: number) => Math.round(n * 100) / 100;

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1 } as const;

function Rings() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      {[40, 80, 120, 160, 200, 240, 280].map((r, i) => (
        <circle key={r} cx="320" cy="80" r={r} {...stroke} opacity={0.9 - i * 0.11} strokeDasharray={i % 2 ? "2 6" : undefined} />
      ))}
      <circle cx="320" cy="80" r="7" fill="var(--color-ribalta)" />
    </svg>
  );
}

function Arch() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <path d="M60 400 V170 A140 110 0 0 1 340 170 V400" {...stroke} opacity="0.9" />
      <path d="M82 400 V174 A118 92 0 0 1 318 174 V400" {...stroke} opacity="0.4" />
      <path
        d="M71 400 V172 A129 101 0 0 1 329 172 V400"
        fill="none"
        stroke="var(--color-ribalta)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="0 16"
        opacity="0.85"
      />
      <path d="M130 90 L200 58 L270 90" {...stroke} opacity="0.6" />
    </svg>
  );
}

function Burst() {
  const rays = Array.from({ length: 23 }, (_, i) => -90 + (180 / 22) * i);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      {rays.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const len = i % 2 ? 250 : 330;
        return (
          <line
            key={deg}
            x1={r2(200 + Math.cos(rad) * 40)}
            y1={r2(330 + Math.sin(rad) * 40)}
            x2={r2(200 + Math.cos(rad) * len)}
            y2={r2(330 + Math.sin(rad) * len)}
            {...stroke}
            opacity={i % 2 ? 0.35 : 0.8}
          />
        );
      })}
      <path d="M200 280l6 44 44 6-44 6-6 44-6-44-44-6 44-6z" fill="var(--color-ribalta)" />
    </svg>
  );
}

function Fan() {
  const ribs = Array.from({ length: 13 }, (_, i) => 180 + (180 / 12) * i);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      {ribs.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return <line key={deg} x1="200" y1="330" x2={r2(200 + Math.cos(rad) * 190)} y2={r2(330 + Math.sin(rad) * 190)} {...stroke} opacity="0.75" />;
      })}
      {ribs.slice(0, -1).map((deg) => {
        const a = (deg * Math.PI) / 180;
        const b = ((deg + 15) * Math.PI) / 180;
        const x1 = r2(200 + Math.cos(a) * 190);
        const y1 = r2(330 + Math.sin(a) * 190);
        const x2 = r2(200 + Math.cos(b) * 190);
        const y2 = r2(330 + Math.sin(b) * 190);
        const cx = r2((x1 + x2) / 2 + Math.cos(a + 0.13) * 22);
        const cy = r2((y1 + y2) / 2 + Math.sin(a + 0.13) * 22);
        return <path key={`s${deg}`} d={`M${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} {...stroke} />;
      })}
      <path d="M90 330 A110 110 0 0 1 310 330" {...stroke} opacity="0.4" />
      <circle cx="200" cy="330" r="9" fill="var(--color-ribalta)" />
    </svg>
  );
}

function Grooves() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => 30 + i * 11).map((r, i) => (
        <circle key={r} cx="250" cy="150" r={r} {...stroke} opacity={i % 4 === 0 ? 0.85 : 0.28} />
      ))}
      <circle cx="250" cy="150" r="18" fill="var(--color-carmim)" />
      <circle cx="250" cy="150" r="3" fill="var(--color-ribalta)" />
    </svg>
  );
}

export function ProgramMotifArt({ motif }: { motif: ProgramMotif }) {
  if (motif === "blade") {
    return (
      <div aria-hidden="true" className="absolute inset-y-0 right-[22%] flex items-stretch">
        <div className="blade" />
      </div>
    );
  }
  const Art = { rings: Rings, arch: Arch, burst: Burst, fan: Fan, grooves: Grooves }[motif];
  return <Art />;
}
