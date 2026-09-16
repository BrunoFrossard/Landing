import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { site } from "@/data/site";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function contactHref(subject: string) { return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`; }
export function numberLabel(value: number) { return String(value).padStart(2, "0"); }
