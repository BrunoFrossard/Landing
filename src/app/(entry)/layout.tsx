import { manrope, instrument } from "@/lib/fonts";
import "../globals.css";

export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className={`${manrope.variable} ${instrument.variable}`}><body>{children}</body></html>;
}
