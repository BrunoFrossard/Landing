import { ArrowUpRight } from "lucide-react";
import { numberLabel } from "@/lib/utils";
import type { Dictionary } from "@/i18n/types";

export function Process({ copy }: { copy: Dictionary["process"] }) {
  return <section id="processo" className="process section-pad" aria-labelledby="process-title"><div className="container">
    <div className="section-heading"><div><p className="eyebrow">{copy.label}</p><h2 id="process-title">{copy.title}<br /><em>{copy.emphasis}</em></h2></div><p className="section-description">{copy.description}</p></div>
    <ol className="process-steps">{copy.items.map((item, index) => <li key={item.title}><div className="process-step-top"><span className="eyebrow">{numberLabel(index + 1)}</span><ArrowUpRight size={16} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
    <div className="credibility"><p className="eyebrow">{copy.institution}</p><p>{copy.credibility}</p></div>
  </div></section>;
}
