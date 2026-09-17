import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import "./globals.css";

const bodoni = localFont({
  src: [
    { path: "./fonts/bodoni-moda-latin-opsz-normal.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/bodoni-moda-latin-opsz-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  // Atenção: next/font escreve fallbacks sem aspas; nomes com números (ex.: "Bodoni 72") invalidam a pilha inteira.
  fallback: ["Didot", "Times New Roman", "serif"],
});

const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  // Página conceitual privada: nunca indexar.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#080707",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que o JS está ativo antes da pintura: só então a cortina final começa fechada. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
