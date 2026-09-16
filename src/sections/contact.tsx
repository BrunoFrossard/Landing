import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { contactHref } from "@/lib/utils";
import type { Dictionary } from "@/i18n/types";

export function Contact({ copy, common }: { copy: Dictionary["contact"]; common: Dictionary["common"] }) {
  return <section id="contato" className="contact section-pad container" aria-labelledby="contact-title">
    <div><p className="eyebrow">{copy.label}</p><h2 id="contact-title">{copy.title}<br /><em>{copy.emphasis}</em></h2><p className="contact-description">{copy.description}</p></div>
    <div className="contact-action"><a className="contact-circle" href={contactHref(common.emailSubject)} aria-label={common.contact}><ArrowUpRight strokeWidth={1} aria-hidden="true" /></a><a className="text-link" href={contactHref(common.emailSubject)}>{common.contact}<ArrowUpRight size={18} /></a><a className="contact-email" href={contactHref(common.emailSubject)}>{site.email}</a><p>{copy.note}</p></div>
  </section>;
}
