import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ToolPage from './pages/ToolPage';
import ProfileSetupModal from './components/ProfileSetupModal';
import { useGetCallerUserProfile } from './hooks/useQueries';

export type ToolId =
  | 'merge'
  | 'split'
  | 'compress'
  | 'image-to-pdf'
  | 'pdf-to-word'
  | 'word-to-pdf'
  | 'excel-to-pdf'
  | 'rotate'
  | 'password-protect';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const queryClient = useQueryClient();

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleLogout = async () => {
    queryClient.clear();
    setActiveTool(null);
  };

  if (isInitializing) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-foreground/50 text-sm">Loading PDF Vaulty...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header
          isAuthenticated={isAuthenticated}
          userName={userProfile?.name}
          onLogout={handleLogout}
          onNavigateHome={() => setActiveTool(null)}
        />
        <main className="flex-1">
          {!isAuthenticated ? (
            <LoginPage />
          ) : activeTool ? (
            <ToolPage toolId={activeTool} onBack={() => setActiveTool(null)} />
          ) : (
            <Dashboard onSelectTool={setActiveTool} userName={userProfile?.name} />
          )}
        </main>
        <Footer />
        {showProfileSetup && <ProfileSetupModal />}
        <Toaster richColors position="top-right" />
      </div>
    </ThemeProvider>
  );
}
