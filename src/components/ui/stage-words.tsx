import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Adaptação do WordsPullUp (PrismaHero, 21st.dev).
 * Em vez de Framer Motion com opacidade inicial 0 (que esconde o título se o JS falhar),
 * cada palavra sobe de trás de uma máscara por CSS: visível no HTML do servidor,
 * animada só quando o sistema permite movimento.
 */
type StageWordsProps = {
  text: string;
  /** Índice inicial para encadear o atraso com outras linhas. */
  startIndex?: number;
  className?: string;
};

export function StageWords({ text, startIndex = 0, className }: StageWordsProps) {
  const words = text.split(" ").filter(Boolean);
  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="stage-mask">
            <span className="stage-word" style={{ "--i": startIndex + i } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
