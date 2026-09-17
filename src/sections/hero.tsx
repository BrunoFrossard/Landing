import { getImageProps } from "next/image";
import { HeroVideo } from "@/components/hero-video";
import { DecoStar } from "@/components/ornaments";
import { buttonVariants } from "@/components/ui/button";
import { StageWords } from "@/components/ui/stage-words";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Herói cinematográfico (adaptado do PrismaHero, 21st.dev).
 * O título se divide em torno do eixo central do palco, onde a fresta de luz do vídeo aparece.
 */
export function Hero() {
  const { hero, opening, address, video } = site;
  const common = { alt: "", sizes: "100vw", width: video.width, height: video.height, quality: 75 };
  const { props: posterProps } = getImageProps({ ...common, src: video.poster, fetchPriority: "high", loading: "eager" });
  const {
    props: { srcSet: stillSrcSet },
  } = getImageProps({ ...common, src: video.still });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <picture>
          {/* Movimento reduzido: quadro estático com a cortina entreaberta. */}
          <source media="(prefers-reduced-motion: reduce)" srcSet={stillSrcSet} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- decorativo, alt vazio vem de getImageProps */}
          <img {...posterProps} />
        </picture>
        <HeroVideo />
      </div>
      <div className="hero-dim" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-stage">
        <p className="hero-kicker playbill stage-fade text-marfim/85" style={{ "--d": "0.1s" } as React.CSSProperties}>
          {opening.kicker}
        </p>

        <h1 id="hero-title" className="hero-title">
          <span className="hero-title-line hero-title-line--a">
            <StageWords text={hero.headline[0]} />
          </span>{" "}
          <span className="hero-title-line hero-title-line--b">
            <StageWords text={hero.headline[1]} startIndex={3} />
          </span>
        </h1>

        <p className="hero-support stage-fade" style={{ "--d": "0.85s" } as React.CSSProperties}>
          {hero.supporting}
        </p>

        <div className="hero-actions stage-fade" style={{ "--d": "1.05s" } as React.CSSProperties}>
          <p className="hero-address">
            <DecoStar className="size-3 text-ouro" />
            <span>{address.street}</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={hero.primaryCta.href} className={buttonVariants({ variant: "primary" })}>
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className={cn(buttonVariants({ variant: "ghost" }))}>
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <a href="#manifesto" className="hero-cue stage-fade" style={{ "--d": "1.5s" } as React.CSSProperties}>
        <span className="hero-cue-line" aria-hidden="true" />
        <span>{hero.scrollCue}</span>
      </a>
    </section>
  );
}
