import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { contactHref } from "@/lib/utils";
import type { Dictionary } from "@/i18n/types";

export function Footer({ copy }: { copy: Dictionary }) {
  return <footer className="site-footer container"><div className="footer-top"><a className="wordmark" href="#inicio" aria-label={copy.nav.home}>alevum<span className="wordmark-dot">.</span></a><p>{copy.footer.statement}</p><a className="icon-button" href="#inicio" aria-label={copy.common.backTop}><ArrowUp size={20} /></a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Alevum</span><span>{copy.footer.location}</span><a className="footer-email" href={contactHref(copy.common.emailSubject)}>{site.email}</a><nav aria-label={copy.footer.navigation}><a href="#projetos">{copy.nav.projects}</a><a href="#pessoas">{copy.nav.people}</a><a href="#contato">{copy.nav.contact}</a></nav></div>
  </footer>;
}
