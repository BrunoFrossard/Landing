export const site = {
  name: "Alevum",
  email: "bruno.frossard@sou.inteli.edu.br",
  // Set the verified canonical domain here when it is connected. No env file required.
  url: null as string | null,
  founders: ["Bruno Frossard", "Rafael Cabral"],
};

export function getSiteUrl() {
  return site.url ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null);
}

export const heroMedia = {
  // Enable only after adding the actual video. No request is made while disabled.
  enabled: false,
  mp4: "/video/alevum-hero.mp4",
  webm: "/video/alevum-hero.webm",
  poster: "/projects/architecture.svg",
};
