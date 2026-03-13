// Language code type — used throughout the app
export type LangCode = "en" | "ar" | "fr" | "es" | "hi" | "pt" | "mr" | "bn";

// translations object kept for any legacy imports (only English bundled inline)
// Individual language chunks are lazy-loaded via LanguageContext
import en from "./lang/en";
export const translations: Record<LangCode, Record<string, string>> = {
  en,
  ar: {},
  fr: {},
  es: {},
  hi: {},
  pt: {},
  mr: {},
  bn: {},
};
