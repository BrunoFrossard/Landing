import { ImageResponse } from "next/og";
import { dictionaries } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = dictionaries[isLocale(locale) ? locale : "pt"];
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f5f2ea", color: "#282822", padding: "64px 74px", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 48, letterSpacing: "-3px", fontWeight: 600 }}>alevum.</span><span style={{ fontSize: 15, color: "#66645c" }}>{copy.hero.eyebrow}</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 77, lineHeight: 1.04, letterSpacing: "-4px" }}><span>{copy.hero.line1}</span><span>{copy.hero.line2} <span style={{ color: "#a04c32", fontStyle: "italic" }}>{copy.hero.emphasis}</span></span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #d4d0c5", paddingTop: 22, fontSize: 17 }}><span>{copy.footer.location}</span><span>{copy.common.contact} ↗</span></div>
    </div>, size,
  );
}
