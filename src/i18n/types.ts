export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  context: string;
  challenge: string;
  solution: string;
  disciplines: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  video?: string;
  status: string;
  partner?: string;
  academicContext: string | null;
  featured: boolean;
  placeholderAsset: boolean;
  color: string;
};

export type Founder = {
  id: string;
  name: string;
  initials: string;
  role: string;
  image: string;
  imageAlt: string;
  placeholderAsset: boolean;
  professional: string;
  personalLabel: string;
  personal: string;
  provisionalBio: boolean;
};

export type Dictionary = {
  meta: { title: string; description: string; imageAlt: string };
  nav: { projects: string; services: string; people: string; contact: string; label: string; home: string };
  common: {
    contact: string; explore: string; emailSubject: string; skip: string;
    close: string; menu: string; menuDescription: string; theme: string;
    light: string; dark: string; language: string; switchLanguage: string;
    backTop: string; arrow: string;
  };
  hero: {
    eyebrow: string; line1: string; line2: string; emphasis: string;
    description: string; footnote: string; location: string;
    canvasLabel: string; canvasTitle: string; canvasSubtitle: string; canvasHint: string;
    phases: { title: string; description: string; note: string }[];
    videoPlay: string; videoPause: string;
  };
  services: {
    label: string; title: string; emphasis: string; description: string;
    items: { title: string; description: string; detail: string }[];
  };
  projects: {
    label: string; title: string; emphasis: string; intro: string;
    previous: string; next: string; view: string; select: string;
    gallery: string; carousel: string; galleryHelp: string; concept: string; note: string;
    context: string; challenge: string; solution: string; disciplines: string;
    technologies: string; status: string; related: string; progress: string;
    items: Project[];
  };
  people: {
    label: string; title: string; emphasis: string; description: string;
    reveal: string; hide: string; professional: string; portrait: string; items: Founder[];
  };
  process: {
    label: string; title: string; emphasis: string; description: string;
    items: { title: string; description: string }[]; credibility: string; institution: string;
  };
  contact: { label: string; title: string; emphasis: string; description: string; note: string };
  footer: { location: string; statement: string; rights: string; navigation: string };
  notFound: { title: string; description: string; back: string };
};
