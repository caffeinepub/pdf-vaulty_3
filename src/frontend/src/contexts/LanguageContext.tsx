import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// English is bundled inline (always needed, zero extra request)
import en from "../i18n/lang/en";
import type { LangCode } from "../i18n/translations";

// Lazy loaders for every non-English language (each becomes its own JS chunk)
const langLoaders: Record<
  Exclude<LangCode, "en">,
  () => Promise<{ default: Record<string, string> }>
> = {
  ar: () => import("../i18n/lang/ar"),
  fr: () => import("../i18n/lang/fr"),
  es: () => import("../i18n/lang/es"),
  hi: () => import("../i18n/lang/hi"),
  pt: () => import("../i18n/lang/pt"),
};

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

const STORAGE_KEY = "pdf-vaulty-lang";
const VALID_LANGS: LangCode[] = ["en", "ar", "fr", "es", "hi", "pt"];

function getInitialLang(): LangCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_LANGS.includes(stored as LangCode)) {
      return stored as LangCode;
    }
  } catch {
    // ignore localStorage errors
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(getInitialLang);
  // Cache loaded translations so we only fetch each language once
  const cache = useRef<Partial<Record<LangCode, Record<string, string>>>>({
    en,
  });
  const [dict, setDict] = useState<Record<string, string>>(
    lang === "en" ? en : {},
  );

  // Load translation chunk when language changes
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;

    if (cache.current[lang]) {
      setDict(cache.current[lang]!);
      return;
    }

    if (lang === "en") {
      cache.current.en = en;
      setDict(en);
      return;
    }

    // Dynamically import the language chunk
    langLoaders[lang as Exclude<LangCode, "en">]().then((mod) => {
      cache.current[lang] = mod.default;
      setDict(mod.default);
    });
  }, [lang]);

  const setLang = (newLang: LangCode) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore localStorage errors
    }
  };

  const t = (key: string): string => {
    return dict[key] ?? en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
