"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import type { Dictionary } from "@/i18n/types";

export type HeroVideo = { mp4?: string; webm?: string; poster: string } | null;

export function HeroCanvas({ copy, video }: { copy: Dictionary["hero"]; video: HeroVideo }) {
  const [phase, setPhase] = useState(1);
  const [videoReady, setVideoReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!video || !frame.current || reduced) return;
    const query = window.matchMedia("(min-width: 768px)");
    let visible = false;
    const sync = () => setVideoReady(visible && query.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.15 });
    observer.observe(frame.current);
    query.addEventListener("change", sync);
    return () => { observer.disconnect(); query.removeEventListener("change", sync); };
  }, [video, reduced]);

  useEffect(() => {
    const element = player.current;
    if (!element) return;
    function sync() {
      if (document.hidden || !videoReady || reduced || userPaused) element?.pause();
      else void element?.play().catch(() => setPlaying(false));
    }
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [videoReady, reduced, userPaused]);

  return <div className="hero-canvas" ref={frame}>
    <div className="canvas-heading"><span className="eyebrow">A / {copy.canvasLabel}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
    <div className="canvas-art" data-phase={phase}>
      <Image src={video?.poster ?? "/projects/architecture.svg"} alt="" fill priority sizes="(max-width: 767px) 100vw, 50vw" className="canvas-image" />
      <svg className="canvas-wireframe" viewBox="0 0 800 650" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1"><path d="M120 480 400 610 720 445 450 320Z M120 480V210L450 62 720 180V445 M450 62V320 M120 210 400 340 720 180 M400 340V610" /><path d="M215 525V255L544 105 M310 570V298L630 140 M230 160 514 280V550 M337 112 621 225V493" strokeDasharray="4 7" /></g>
        <g fill="currentColor"><circle cx="120" cy="480" r="4" /><circle cx="400" cy="610" r="4" /><circle cx="720" cy="445" r="4" /><circle cx="450" cy="62" r="4" /></g>
      </svg>
      <div className="canvas-cross cross-one" aria-hidden="true">+</div><div className="canvas-cross cross-two" aria-hidden="true">+</div>
      <span className="canvas-coordinate eyebrow" aria-hidden="true">A — 001 / {String(phase + 1).padStart(2, "0")}</span>
      <div className="canvas-caption"><span className="eyebrow">{copy.phases[phase].note}</span><h2>{copy.canvasTitle}</h2></div>
      {video && videoReady && !failed && !reduced && <>
        <video ref={player} className="hero-video" autoPlay muted loop playsInline preload="none" poster={video.poster} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
        <button className="icon-button video-control" aria-label={playing ? copy.videoPause : copy.videoPlay} onClick={() => setUserPaused(playing)}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
      </>}
    </div>
    <div className="canvas-controls" aria-label={copy.canvasHint}>
      {copy.phases.map((item, index) => <button key={item.title} aria-pressed={phase === index} onClick={() => setPhase(index)}><span className="phase-index">0{index + 1}</span>{item.title}{phase === index && <motion.span className="phase-indicator" layoutId="hero-phase" transition={{ duration: reduced ? 0 : 0.25 }} />}</button>)}
    </div>
    <p className="canvas-description" aria-live="polite">{copy.phases[phase].description}</p>
  </div>;
}
