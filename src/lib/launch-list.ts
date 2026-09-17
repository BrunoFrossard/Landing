import { site } from "@/data/site";

export type LaunchListSignup = { name: string; email: string };
export type LaunchListResult = { ok: true; demo: boolean } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateSignup(data: LaunchListSignup) {
  const errors: Partial<Record<keyof LaunchListSignup, string>> = {};
  if (!data.name.trim()) errors.name = site.launchList.errors.name;
  if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = site.launchList.errors.email;
  return errors;
}

/**
 * Ponto único de integração da lista de lançamento.
 * No modo "demo" nada sai do navegador. Para conectar,
 * defina `site.launchList.mode = "endpoint"` e `endpoint`.
 */
export async function submitLaunchListSignup(data: LaunchListSignup): Promise<LaunchListResult> {
  const { mode, endpoint } = site.launchList;

  if (mode === "demo" || !endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return { ok: true, demo: true };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name.trim(), email: data.email.trim() }),
    });
    if (!response.ok) return { ok: false, error: site.launchList.errors.generic };
    return { ok: true, demo: false };
  } catch {
    return { ok: false, error: site.launchList.errors.generic };
  }
}
