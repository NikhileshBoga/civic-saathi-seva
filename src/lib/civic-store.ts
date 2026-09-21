import { useCallback, useEffect, useState } from "react";

const SAVED_KEY = "civicseva.saved";
const RECENT_KEY = "civicseva.recent";
const LANG_KEY = "civicseva.lang";

function read(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed.filter((v) => typeof v === "string") as string[]) : [];
  } catch {
    return [];
  }
}

function write(key: string, value: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("civicseva:store"));
}

function useList(key: string) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setItems(read(key));
    sync();
    window.addEventListener("civicseva:store", sync);
    return () => window.removeEventListener("civicseva:store", sync);
  }, [key]);

  return [items, setItems] as const;
}

export function useSavedServices() {
  const [saved] = useList(SAVED_KEY);

  const toggle = useCallback((slug: string) => {
    const current = read(SAVED_KEY);
    write(SAVED_KEY, current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current]);
  }, []);

  return { saved, toggle, isSaved: (slug: string) => saved.includes(slug) };
}

export function useRecentServices() {
  const [recent] = useList(RECENT_KEY);
  return recent;
}

export function recordVisit(slug: string) {
  if (typeof window === "undefined") return;
  const current = read(RECENT_KEY).filter((s) => s !== slug);
  write(RECENT_KEY, [slug, ...current].slice(0, 6));
}

export type Lang = "en" | "hi" | "te" | "ta";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
];

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const sync = () => {
      const stored = window.localStorage.getItem(LANG_KEY);
      if (stored === "en" || stored === "hi" || stored === "te" || stored === "ta") setLangState(stored);
    };
    sync();
    window.addEventListener("civicseva:store", sync);
    return () => window.removeEventListener("civicseva:store", sync);
  }, []);

  const setLang = useCallback((next: Lang) => {
    window.localStorage.setItem(LANG_KEY, next);
    window.dispatchEvent(new CustomEvent("civicseva:store"));
  }, []);

  return { lang, setLang };
}

type Copy = { heroTitle: string; heroSubtitle: string; searchLabel: string; cta: string };

const COPY: Record<Lang, Copy> = {
  en: {
    heroTitle: "Find the right government service. Simply.",
    heroSubtitle:
      "Describe what you need in your own words, and CivicSeva helps you discover the relevant government services.",
    searchLabel: "What do you need help with?",
    cta: "Find Services",
  },
  hi: {
    heroTitle: "सही सरकारी सेवा खोजें। आसानी से।",
    heroSubtitle:
      "अपनी ज़रूरत अपने शब्दों में बताइए, CivicSeva आपके लिए सही सरकारी सेवाएँ खोजने में मदद करेगा।",
    searchLabel: "आपको किस चीज़ में मदद चाहिए?",
    cta: "सेवाएँ खोजें",
  },
  te: {
    heroTitle: "సరైన ప్రభుత్వ సేవను సులభంగా కనుగొనండి.",
    heroSubtitle:
      "మీ అవసరాన్ని మీ మాటల్లో చెప్పండి, సంబంధిత ప్రభుత్వ సేవలను CivicSeva చూపిస్తుంది.",
    searchLabel: "మీకు ఏ విషయంలో సహాయం కావాలి?",
    cta: "సేవలను కనుగొనండి",
  },
  ta: {
    heroTitle: "சரியான அரசு சேவையை எளிதாகக் கண்டறியுங்கள்.",
    heroSubtitle:
      "உங்கள் தேவையை உங்கள் சொற்களில் கூறுங்கள், தொடர்புடைய அரசு சேவைகளை CivicSeva காட்டும்.",
    searchLabel: "உங்களுக்கு எதில் உதவி தேவை?",
    cta: "சேவைகளைத் தேடுங்கள்",
  },
};

export function copyFor(lang: Lang): Copy {
  return COPY[lang];
}
