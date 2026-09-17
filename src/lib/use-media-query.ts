"use client";

import { useSyncExternalStore } from "react";

/**
 * Media query segura para hidratação: o servidor (e a primeira
 * renderização do cliente) usa `serverValue`; depois o valor real assume.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

type NetworkInformationLike = { saveData?: boolean; effectiveType?: string };

/** Economia de dados ou conexão 2G: não baixar o vídeo. */
export function useConstrainedNetwork() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
      if (!connection) return false;
      return Boolean(connection.saveData) || /(^|-)2g$/.test(connection.effectiveType ?? "");
    },
    () => true,
  );
}
