import type { Founder, Locale } from "@/i18n/types";

const bruno = { id: "bruno", name: "Bruno Frossard", initials: "BF", image: "/people/bruno.svg", placeholderAsset: true, provisionalBio: false };
const rafael = { id: "rafael", name: "Rafael Cabral", initials: "RC", image: "/people/rafael.svg", placeholderAsset: true, provisionalBio: true };

export const founderContent: Record<Locale, Founder[]> = {
  pt: [
    { ...bruno, role: "Cofundador", imageAlt: "Composição tipográfica BF, representando Bruno Frossard.",
      professional: "Estudante de Engenharia da Computação no Inteli. Explora produto, IA e liderança para transformar tecnologia emergente em algo útil, com impacto prático e social.",
      personalLabel: "Fora da tela", personal: "Entre uma ideia e outra, tem futevôlei, esporte e treino. A curiosidade por construir continua quando volta para a tela." },
    { ...rafael, role: "Cofundador", imageAlt: "Composição tipográfica RC, representando Rafael Cabral.",
      professional: "Estudante de Engenharia da Computação no Inteli. Está construindo a Alevum ao lado de Bruno, da discussão das ideias ao desenvolvimento do produto.",
      personalLabel: "Neste momento", personal: "Construindo a Alevum. Uma conversa, uma decisão e uma versão de cada vez." },
  ],
  en: [
    { ...bruno, role: "Co-founder", imageAlt: "BF typographic composition representing Bruno Frossard.",
      professional: "Computer Engineering student at Inteli. Explores product, AI and leadership to turn emerging technology into something useful, with practical and social impact.",
      personalLabel: "Away from the screen", personal: "Between ideas, there’s footvolley, sports and training. The curiosity to build carries on when he’s back at the screen." },
    { ...rafael, role: "Co-founder", imageAlt: "RC typographic composition representing Rafael Cabral.",
      professional: "Computer Engineering student at Inteli. Building Alevum alongside Bruno, from discussing ideas to developing the product.",
      personalLabel: "Right now", personal: "Building Alevum. One conversation, one decision and one version at a time." },
  ],
};
