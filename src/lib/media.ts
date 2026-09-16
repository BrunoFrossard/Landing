import { existsSync } from "node:fs";
import path from "node:path";
import { heroMedia } from "@/data/site";
import type { HeroVideo } from "@/components/hero-canvas";

export function getHeroVideo(): HeroVideo {
  if (!heroMedia.enabled) return null;
  const present = (file: string) => existsSync(path.join(process.cwd(), "public", file));
  const mp4 = present(heroMedia.mp4) ? heroMedia.mp4 : undefined;
  const webm = present(heroMedia.webm) ? heroMedia.webm : undefined;
  if (!mp4 && !webm) return null;
  return { mp4, webm, poster: present(heroMedia.poster) ? heroMedia.poster : "/projects/architecture.svg" };
}
