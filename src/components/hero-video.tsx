"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { useConstrainedNetwork, useMediaQuery } from "@/lib/use-media-query";

/**
 * Vídeo de fundo do herói.
 * - Só é montado no cliente, e só quando o sistema permite movimento e a conexão não é restrita.
 * - O pôster (quadro inicial idêntico) já está na tela pelo HTML do servidor; o vídeo entra por fade no evento `playing`.
 * - Pausa quando o herói sai da tela; escurece por um instante na virada do loop (blecaute de palco).
 * - Nenhum estado do React muda durante a reprodução: tudo via atributos de dados.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", true);
  const constrained = useConstrainedNetwork();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const variant = reducedMotion || constrained ? null : isMobile ? "mobile" : "desktop";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const hero = video.closest<HTMLElement>(".hero");

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    const tryPlay = () => {
      video.play().catch(() => {
        /* Autoplay bloqueado (ex.: modo de pouca energia): o pôster permanece. */
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { rootMargin: "120px 0px" },
    );
    if (hero) observer.observe(hero);
    else tryPlay();

    return () => {
      observer.disconnect();
      video.pause();
      if (hero) delete hero.dataset.dim;
    };
  }, [variant]);

  if (!variant) return null;

  const sources = site.video.sources[variant];

  return (
    <video
      key={variant}
      ref={videoRef}
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={site.video.poster}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      disableRemotePlayback
      onPlaying={(event) => {
        event.currentTarget.dataset.ready = "true";
      }}
      onTimeUpdate={(event) => {
        const v = event.currentTarget;
        const hero = v.closest<HTMLElement>(".hero");
        if (!hero || !Number.isFinite(v.duration)) return;
        const dim = v.currentTime > v.duration - 0.42;
        if ((hero.dataset.dim === "true") !== dim) hero.dataset.dim = String(dim);
      }}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
