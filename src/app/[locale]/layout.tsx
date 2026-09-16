import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { dictionaries } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/types";
import { getSiteUrl } from "@/data/site";
import { instrument, manrope } from "@/lib/fonts";
import "../globals.css";

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = dictionaries[locale];
  const url = getSiteUrl();
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    applicationName: "Alevum",
    metadataBase: new URL(url ?? "http://localhost:3000"),
    ...(url ? { metadataBase: new URL(url), alternates: { canonical: `${url}/${locale}`, languages: { "pt-BR": `${url}/pt`, en: `${url}/en`, "x-default": `${url}/pt` } } } : {}),
    openGraph: { type: "website", title: copy.meta.title, description: copy.meta.description, siteName: "Alevum", locale: locale === "pt" ? "pt_BR" : "en_US", alternateLocale: locale === "pt" ? "en_US" : "pt_BR", images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: copy.meta.imageAlt }], ...(url ? { url: `${url}/${locale}` } : {}) },
    twitter: { card: "summary_large_image", title: copy.meta.title, description: copy.meta.description },
    icons: { icon: "/icon.svg", apple: "/apple-icon" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: "device-width", initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5f2ea" }, { media: "(prefers-color-scheme: dark)", color: "#22231f" }],
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = dictionaries[locale];
  return <html lang={locale === "pt" ? "pt-BR" : "en"} suppressHydrationWarning className={`${manrope.variable} ${instrument.variable}`}>
    <body><Providers><a href="#conteudo" className="skip-link">{copy.common.skip}</a><Header locale={locale} copy={{ nav: copy.nav, common: copy.common }} />{children}<Footer copy={copy} /></Providers></body>
  </html>;
}
