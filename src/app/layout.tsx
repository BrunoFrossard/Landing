import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-ten-chi-80.vercel.app"),
  title: "Iporanga — Sob a superfície",
  description: "Uma viagem pela história de Iporanga, do ciclo do ouro às cavernas do PETAR.",
  openGraph: {
    title: "Iporanga — Sob a superfície",
    description: "Do ouro às cavernas: uma viagem por Iporanga e o PETAR.",
    url: "/",
    siteName: "Iporanga",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#111711" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
