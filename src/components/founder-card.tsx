"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Dictionary, Founder } from "@/i18n/types";

export function FounderCard({ founder, copy, index }: { founder: Founder; copy: Omit<Dictionary["people"], "items">; index: number }) {
  const [revealed, setRevealed] = useState(false);
  return <article className="founder-card" data-revealed={revealed}>
    <div className="founder-visual"><Image src={founder.image} alt={founder.imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" className="founder-image" />
      <span className="founder-index eyebrow">0{index + 1} / ALEVUM</span>
      {founder.placeholderAsset && <span className="portrait-label eyebrow">{copy.portrait}</span>}
      <div id={`founder-personal-${founder.id}`} className="founder-reveal" aria-hidden={!revealed} inert={!revealed}>
        <ArrowUpRight size={32} aria-hidden="true" /><span className="eyebrow">{founder.personalLabel}</span><p>{founder.personal}</p>
      </div>
    </div>
    <div className="founder-info"><div className="founder-name"><div><h3>{founder.name}</h3><p>{founder.role}</p></div><button className="icon-button" aria-label={`${revealed ? copy.hide : copy.reveal}: ${founder.name}`} aria-expanded={revealed} aria-controls={`founder-personal-${founder.id}`} onClick={() => setRevealed(!revealed)}>{revealed ? <Minus size={22} /> : <Plus size={22} />}</button></div>
      <p className="founder-professional">{founder.professional}</p>
      <button className="founder-text-toggle text-link" aria-expanded={revealed} aria-controls={`founder-personal-${founder.id}`} onClick={() => setRevealed(!revealed)}>{revealed ? copy.hide : copy.reveal}<ArrowUpRight size={16} /></button>
    </div>
  </article>;
}
