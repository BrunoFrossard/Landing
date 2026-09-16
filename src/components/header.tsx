"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Sun } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { contactHref } from "@/lib/utils";
import type { Dictionary, Locale } from "@/i18n/types";

const subscribe = () => () => {};

function ThemeToggle({ copy }: { copy: Dictionary["common"] }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = resolvedTheme === "dark";
  return <button className="icon-button theme-toggle" aria-label={mounted ? (dark ? copy.light : copy.dark) : copy.theme} onClick={() => setTheme(dark ? "light" : "dark")}>
    <Sun className="theme-sun" size={17} /><Moon className="theme-moon" size={17} />
  </button>;
}

export function Header({ locale, copy }: { locale: Locale; copy: Pick<Dictionary, "nav" | "common"> }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#projetos", label: copy.nav.projects },
    { href: "#servicos", label: copy.nav.services },
    { href: "#pessoas", label: copy.nav.people },
  ];
  const otherLocale = locale === "pt" ? "en" : "pt";
  function saveLocale() {
    try { localStorage.setItem("alevum-locale", otherLocale); } catch { /* Private mode still navigates. */ }
    document.cookie = `alevum-locale=${otherLocale}; path=/; max-age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  }
  return <header className="site-header">
    <div className="header-inner container">
      <a className="wordmark" href="#inicio" aria-label={copy.nav.home}>alevum<span className="wordmark-dot">.</span></a>
      <nav className="desktop-nav" aria-label={copy.nav.label}>{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <div className="header-tools">
        <Link className="language-control" href={`/${otherLocale}`} hrefLang={otherLocale === "pt" ? "pt-BR" : "en"} lang={otherLocale === "pt" ? "pt-BR" : "en"} aria-label={copy.common.switchLanguage} onClick={saveLocale} scroll={false} prefetch={false}>
          <span className={locale === "pt" ? "selected-language" : ""}>PT</span><span aria-hidden="true" className="language-divider">/</span><span className={locale === "en" ? "selected-language" : ""}>EN</span>
        </Link>
        <ThemeToggle copy={copy.common} />
        <a className="header-contact" href={contactHref(copy.common.emailSubject)}>{copy.common.contact}<ArrowUpRight size={16} /></a>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button className="icon-button mobile-menu-button" aria-label={copy.common.menu}><Menu size={22} /></button></DialogTrigger>
          <DialogContent className="mobile-menu" closeLabel={copy.common.close}>
            <DialogTitle className="wordmark">alevum<span className="wordmark-dot">.</span></DialogTitle>
            <DialogDescription className="sr-only">{copy.common.menuDescription}</DialogDescription>
            <nav aria-label={copy.nav.label}>{[...links, { href: "#contato", label: copy.nav.contact }].map((link, index) => <DialogClose key={link.href} asChild><a href={link.href}><span className="eyebrow">0{index + 1}</span>{link.label}<ArrowUpRight size={22} /></a></DialogClose>)}</nav>
            <a className="button button-primary" href={contactHref(copy.common.emailSubject)}>{copy.common.contact}<ArrowUpRight size={18} /></a>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </header>;
}
