import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { Globe, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import type { AppView } from "../App";
import { useLanguage } from "../contexts/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import type { LangCode } from "../i18n/translations";

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
  onNavigateHome: () => void;
  onNavigateMyFiles: () => void;
  onNavigateProfile?: () => void;
  activeView: AppView;
}

const LANGUAGES: { code: LangCode }[] = [
  { code: "en" },
  { code: "ar" },
  { code: "fr" },
  { code: "es" },
  { code: "hi" },
  { code: "pt" },
  { code: "mr" },
  { code: "bn" },
];

export default function Header({
  isAuthenticated,
  userName,
  onLogout,
  onNavigateHome,
  onNavigateMyFiles,
  onNavigateProfile,
  activeView,
}: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { login, clear, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { lang, setLang, t } = useLanguage();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isLangOpen]);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    onLogout();
  };

  const handleLogin = () => login();

  const handleThemeToggle = () => setTheme(isDark ? "light" : "dark");

  const navLinkBase =
    "px-3 py-1.5 text-sm font-medium transition-colors rounded-md whitespace-nowrap";
  const navLinkActive =
    "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 underline underline-offset-4";
  const navLinkInactive =
    "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10";

  const isDashboard = activeView === "dashboard" || activeView === "tool";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between h-14 gap-4 min-h-0">
          {/* Left: Logo + Nav */}
          <div className="flex flex-row items-center gap-4 min-w-0 flex-shrink-0">
            {/* Logo */}
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex flex-row items-center gap-2 group flex-shrink-0"
              data-ocid="nav.home.link"
            >
              <div className="w-7 h-7 flex-shrink-0 rounded overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-0.5">
                <img
                  src="/assets/generated/pdf-vaulty-logo-v3-transparent.dim_256x256.png"
                  alt="PDF Vaulty"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<span style="color:white;font-weight:900;font-size:11px;line-height:1">PV</span>';
                    }
                  }}
                />
              </div>
              <span className="font-bold text-base text-gray-900 dark:text-white tracking-tight whitespace-nowrap">
                PDF Vaulty
              </span>
            </button>

            {/* Nav links */}
            <TooltipProvider delayDuration={300}>
              <nav className="hidden sm:flex flex-row items-center gap-1">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  data-ocid="nav.home.button"
                  className={`${navLinkBase} ${isDashboard ? navLinkActive : navLinkInactive}`}
                >
                  {t("nav.home")}
                </button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <button
                        type="button"
                        onClick={
                          isAuthenticated ? onNavigateMyFiles : undefined
                        }
                        disabled={!isAuthenticated}
                        data-ocid="nav.myfiles.button"
                        className={`${navLinkBase} ${
                          activeView === "myFiles"
                            ? navLinkActive
                            : navLinkInactive
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        {t("nav.myFiles")}
                      </button>
                    </span>
                  </TooltipTrigger>
                  {!isAuthenticated && (
                    <TooltipContent data-ocid="nav.myfiles.tooltip">
                      <p>Login required</p>
                    </TooltipContent>
                  )}
                </Tooltip>
                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={onNavigateProfile}
                    data-ocid="nav.profile.button"
                    className={`${navLinkBase} ${activeView === "profile" ? navLinkActive : navLinkInactive} flex items-center gap-1.5`}
                  >
                    <User className="w-3.5 h-3.5" />
                    {t("nav.profile")}
                  </button>
                )}
              </nav>
            </TooltipProvider>
          </div>

          {/* Right side */}
          <div className="flex flex-row items-center gap-2 flex-shrink-0">
            {isAuthenticated && userName && (
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {userName}
              </span>
            )}

            {/* Language dropdown */}
            <div className="relative flex-shrink-0" ref={langDropdownRef}>
              <button
                type="button"
                data-ocid="header.language.toggle"
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-1"
                aria-label="Change language"
                aria-expanded={isLangOpen}
                aria-haspopup="listbox"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-semibold hidden sm:inline uppercase">
                  {lang}
                </span>
              </button>

              {isLangOpen && (
                <div
                  data-ocid="header.language.dropdown_menu"
                  aria-label="Select language"
                  className="absolute right-0 top-full mt-1.5 w-44 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] shadow-lg shadow-black/10 dark:shadow-black/40 overflow-hidden z-[100]"
                >
                  <div className="py-1">
                    {LANGUAGES.map(({ code }) => {
                      const isActive = lang === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          dir="auto"
                          onClick={() => {
                            setLang(code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-left ${
                            isActive
                              ? "bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-medium"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                          }`}
                        >
                          <span>{t(`lang.${code}`)}</span>
                          {isActive && (
                            <svg
                              className="ml-auto w-3.5 h-3.5 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <title>Selected</title>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={handleThemeToggle}
              data-ocid="header.theme.toggle"
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-white/10 flex-shrink-0 [transition:color_0.15s_ease]"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Auth button */}
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                data-ocid="nav.logout.button"
                className="px-4 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors whitespace-nowrap flex-shrink-0"
              >
                {t("nav.logout")}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoggingIn}
                data-ocid="nav.login.button"
                className="px-4 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50 whitespace-nowrap flex-shrink-0"
              >
                {isLoggingIn ? t("nav.loggingIn") : t("nav.login")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <TooltipProvider delayDuration={300}>
        <nav
          className="flex sm:hidden flex-row items-center justify-around border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d0d0d]"
          aria-label="Mobile navigation"
        >
          {/* Home */}
          <button
            type="button"
            onClick={onNavigateHome}
            data-ocid="mobile.nav.home.button"
            className={`flex-1 flex items-center justify-center py-2.5 text-xs font-medium transition-colors min-h-[44px] ${
              isDashboard
                ? "text-blue-600 dark:text-blue-400 border-t-2 border-blue-500 dark:border-blue-400 -mt-px"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-t-2 border-transparent -mt-px"
            }`}
          >
            {t("nav.home")}
          </button>

          {/* My Files */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex-1">
                <button
                  type="button"
                  onClick={isAuthenticated ? onNavigateMyFiles : undefined}
                  disabled={!isAuthenticated}
                  data-ocid="mobile.nav.myfiles.button"
                  className={`w-full flex items-center justify-center py-2.5 text-xs font-medium transition-colors min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed ${
                    activeView === "myFiles"
                      ? "text-blue-600 dark:text-blue-400 border-t-2 border-blue-500 dark:border-blue-400 -mt-px"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-t-2 border-transparent -mt-px"
                  }`}
                >
                  {t("nav.myFiles")}
                  {!isAuthenticated && (
                    <svg
                      className="ml-1 w-3 h-3 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <title>Login required</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  )}
                </button>
              </span>
            </TooltipTrigger>
            {!isAuthenticated && (
              <TooltipContent data-ocid="mobile.nav.myfiles.tooltip">
                <p>Login required</p>
              </TooltipContent>
            )}
          </Tooltip>

          {/* Profile */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex-1">
                <button
                  type="button"
                  onClick={isAuthenticated ? onNavigateProfile : undefined}
                  disabled={!isAuthenticated}
                  data-ocid="mobile.nav.profile.button"
                  className={`w-full flex items-center justify-center py-2.5 text-xs font-medium transition-colors min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed ${
                    activeView === "profile"
                      ? "text-blue-600 dark:text-blue-400 border-t-2 border-blue-500 dark:border-blue-400 -mt-px"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-t-2 border-transparent -mt-px"
                  }`}
                >
                  {t("nav.profile")}
                  {!isAuthenticated && (
                    <svg
                      className="ml-1 w-3 h-3 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <title>Login required</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  )}
                </button>
              </span>
            </TooltipTrigger>
            {!isAuthenticated && (
              <TooltipContent data-ocid="mobile.nav.profile.tooltip">
                <p>Login required</p>
              </TooltipContent>
            )}
          </Tooltip>
        </nav>
      </TooltipProvider>
    </header>
  );
}
