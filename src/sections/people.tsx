import { FounderCard } from "@/components/founder-card";
import type { Dictionary } from "@/i18n/types";

export function People({ copy }: { copy: Dictionary["people"] }) {
  const { items, ...labels } = copy;
  return <section id="pessoas" className="people section-pad container" aria-labelledby="people-title">
    <div className="section-heading"><div><p className="eyebrow">{copy.label}</p><h2 id="people-title">{copy.title}<br /><em>{copy.emphasis}</em></h2></div><p className="section-description">{copy.description}</p></div>
    <div className="founder-grid">{items.map((founder, index) => <FounderCard key={founder.id} founder={founder} copy={labels} index={index} />)}</div>
  </section>;
}
