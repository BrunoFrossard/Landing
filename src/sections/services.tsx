import { Plus } from "lucide-react";
import { numberLabel } from "@/lib/utils";
import type { Dictionary } from "@/i18n/types";

export function Services({ copy }: { copy: Dictionary["services"] }) {
  return <section id="servicos" className="services section-pad container" aria-labelledby="services-title">
    <div className="section-intro"><p className="eyebrow">{copy.label}</p><h2 id="services-title">{copy.title}<br /><em>{copy.emphasis}</em></h2><p className="section-description">{copy.description}</p></div>
    <div className="service-list">{copy.items.map((item, index) => <details key={item.title} className="service-item" name="services">
      <summary><span className="eyebrow service-number">{numberLabel(index + 1)}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><Plus className="service-plus" size={20} aria-hidden="true" /></summary>
      <p className="service-detail">{item.detail}</p>
    </details>)}</div>
  </section>;
}
