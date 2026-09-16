import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { HeroCanvas, type HeroVideo } from "@/components/hero-canvas";
import { contactHref } from "@/lib/utils";
import type { Dictionary } from "@/i18n/types";

export function Hero({ copy, video }: { copy: Dictionary; video: HeroVideo }) {
  return <section id="inicio" className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow hero-eyebrow"><span className="status-dot" />{copy.hero.eyebrow}</p>
      <h1 id="hero-title"><span>{copy.hero.line1}</span><span>{copy.hero.line2}</span><em>{copy.hero.emphasis}</em></h1>
      <p className="hero-description">{copy.hero.description}</p>
      <div className="hero-actions"><a className="button button-primary" href={contactHref(copy.common.emailSubject)}>{copy.common.contact}<ArrowUpRight size={18} /></a><a className="text-link" href="#projetos">{copy.common.explore}<ArrowDownRight size={18} /></a></div>
      <div className="hero-signature"><div className="signature-monograms" aria-hidden="true"><span>BF</span><span>RC</span></div><p>{copy.hero.footnote}</p><a className="hero-meet" href="#pessoas">{copy.nav.people}<ArrowUpRight size={13} /></a></div>
    </div>
    <HeroCanvas copy={copy.hero} video={video} />
    <div className="hero-baseline"><span>{copy.hero.location}</span><a href="#pessoas">{copy.nav.people}<ArrowDownRight size={16} /></a></div>
  </section>;
}
