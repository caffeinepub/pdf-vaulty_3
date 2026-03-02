import { Sun, Moon, Globe, Eye } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import type { AppView } from '../App';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
  onNavigateHome: () => void;
  onNavigateAnalytics: () => void;
  onNavigateMyFiles: () => void;
  activeView: AppView;
}

export default function Header({
  isAuthenticated,
  userName,
  onLogout,
  onNavigateHome,
  onNavigateAnalytics,
  onNavigateMyFiles,
  activeView,
}: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { login, clear, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isDark = resolvedTheme === 'dark';

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    onLogout();
  };

  const handleLogin = () => {
    login();
  };

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const navLinkBase =
    'px-3 py-1.5 text-sm font-medium transition-colors rounded-md whitespace-nowrap';
  const navLinkActive =
    'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 underline underline-offset-4';
  const navLinkInactive =
    'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10';

  const isDashboard = activeView === 'dashboard' || activeView === 'tool';

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between h-14 gap-4">
          {/* Left: Logo + Nav */}
          <div className="flex flex-row items-center gap-4 min-w-0 flex-shrink-0">
            {/* Logo */}
            <button
              onClick={onNavigateHome}
              className="flex flex-row items-center gap-2 group flex-shrink-0"
            >
              <div className="w-7 h-7 flex-shrink-0 rounded overflow-hidden bg-white flex items-center justify-center">
                <img
                  src="/assets/generated/pdf-vaulty-logo.dim_256x256.png"
                  alt="PDF Vaulty"
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="font-bold text-base text-gray-900 dark:text-white tracking-tight whitespace-nowrap">
                PDF Vaulty
              </span>
            </button>

            {/* Nav links */}
            <nav className="hidden sm:flex flex-row items-center gap-1">
              <button
                onClick={onNavigateHome}
                className={`${navLinkBase} ${isDashboard ? navLinkActive : navLinkInactive}`}
              >
                Home
              </button>
              <button
                onClick={isAuthenticated ? onNavigateAnalytics : undefined}
                disabled={!isAuthenticated}
                className={`${navLinkBase} ${
                  activeView === 'analytics' ? navLinkActive : navLinkInactive
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                Analytics
              </button>
              <button
                onClick={isAuthenticated ? onNavigateMyFiles : undefined}
                disabled={!isAuthenticated}
                className={`${navLinkBase} ${
                  activeView === 'myFiles' ? navLinkActive : navLinkInactive
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                My Files
              </button>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex flex-row items-center gap-2 flex-shrink-0">
            {/* View count */}
            <div className="hidden sm:flex flex-row items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
              <Eye className="w-4 h-4 flex-shrink-0" />
              <span>1 views</span>
            </div>

            {/* User name */}
            {isAuthenticated && userName && (
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {userName}
              </span>
            )}

            {/* Globe icon */}
            <button className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-white/10 flex-shrink-0">
              <Globe className="w-4 h-4" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-white/10 flex-shrink-0"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors whitespace-nowrap flex-shrink-0"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="px-4 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50 whitespace-nowrap flex-shrink-0"
              >
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
