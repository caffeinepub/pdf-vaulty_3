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
import AnalyticsPage from './pages/AnalyticsPage';
import MyFilesPage from './pages/MyFilesPage';
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

export type AppView = 'dashboard' | 'tool' | 'analytics' | 'myFiles';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const queryClient = useQueryClient();

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleLogout = async () => {
    queryClient.clear();
    setActiveTool(null);
    setActiveView('dashboard');
  };

  const handleNavigateHome = () => {
    setActiveTool(null);
    setActiveView('dashboard');
  };

  const handleSelectTool = (id: ToolId) => {
    setActiveTool(id);
    setActiveView('tool');
  };

  const handleNavigateAnalytics = () => {
    setActiveTool(null);
    setActiveView('analytics');
  };

  const handleNavigateMyFiles = () => {
    setActiveTool(null);
    setActiveView('myFiles');
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

  const renderMain = () => {
    if (!isAuthenticated) return <LoginPage />;

    if (activeView === 'tool' && activeTool) {
      return <ToolPage toolId={activeTool} onBack={handleNavigateHome} />;
    }
    if (activeView === 'analytics') {
      return <AnalyticsPage onNavigateToDashboard={handleNavigateHome} />;
    }
    if (activeView === 'myFiles') {
      return <MyFilesPage onNavigateToDashboard={handleNavigateHome} />;
    }
    return <Dashboard onSelectTool={handleSelectTool} userName={userProfile?.name} />;
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header
          isAuthenticated={isAuthenticated}
          userName={userProfile?.name}
          onLogout={handleLogout}
          onNavigateHome={handleNavigateHome}
          onNavigateAnalytics={handleNavigateAnalytics}
          onNavigateMyFiles={handleNavigateMyFiles}
          activeView={activeView}
        />
        <main className="flex-1">
          {renderMain()}
        </main>
        <Footer />
        {showProfileSetup && <ProfileSetupModal />}
        <Toaster richColors position="top-right" />
      </div>
    </ThemeProvider>
  );
}
