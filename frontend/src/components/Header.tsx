import { Sun, Moon, Globe, Eye } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export default function Header({ isAuthenticated, userName, onLogout, onNavigateHome }: HeaderProps) {
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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group"
            >
              <img
                src="/assets/generated/pdf-vaulty-logo.dim_256x256.png"
                alt="PDF Vaulty"
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="font-bold text-base text-gray-900 dark:text-white tracking-tight">PDF Vaulty</span>
            </button>

            {/* Nav links */}
            <nav className="hidden sm:flex items-center gap-1">
              <button
                onClick={onNavigateHome}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Home
              </button>
              <button
                className="px-3 py-1.5 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-default rounded-md"
                disabled
              >
                Analytics
              </button>
              <button
                className="px-3 py-1.5 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-default rounded-md"
                disabled
              >
                My Files
              </button>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* View count */}
            <div className="hidden sm:flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
              <Eye className="w-4 h-4" />
              <span>1 views</span>
            </div>

            {/* User name */}
            {isAuthenticated && userName && (
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {userName}
              </span>
            )}

            {/* Globe icon */}
            <button className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
              <Globe className="w-4 h-4" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth button */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-300 border border-gray-800 dark:border-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="px-4 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-300 border border-gray-800 dark:border-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
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
