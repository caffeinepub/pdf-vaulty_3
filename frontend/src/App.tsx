import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy, useCallback, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProfileSetupModal from "./components/ProfileSetupModal";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "./hooks/useQueries";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyFilesPage = lazy(() => import("./pages/MyFilesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ToolPage = lazy(() => import("./pages/ToolPage"));

export type ToolId =
  | "merge"
  | "split"
  | "compress"
  | "image-to-pdf"
  | "pdf-to-word"
  | "word-to-pdf"
  | "excel-to-pdf"
  | "rotate"
  | "password-protect"
  | "pdf-converter"
  | "add-page-numbers"
  | "add-watermark"
  | "crop-pdf"
  | "flatten-pdf";

export type AppView = "dashboard" | "tool" | "myFiles" | "profile";

export default function App() {
  const { identity, login, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [activeView, setActiveView] = useState<AppView>("dashboard");
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const queryClient = useQueryClient();

  const handleRequestLogin = useCallback(() => {
    login();
  }, [login]);

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();

  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleLogout = async () => {
    queryClient.clear();
    setActiveView("dashboard");
    setActiveTool(null);
  };

  const handleSelectTool = (id: ToolId) => {
    setActiveTool(id);
    setActiveView("tool");
  };

  const handleBack = () => {
    setActiveTool(null);
    setActiveView("dashboard");
  };

  const handleNavigateToDashboard = () => {
    setActiveTool(null);
    setActiveView("dashboard");
  };

  const pageFallback = (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );

  const renderContent = () => {
    if (isInitializing) {
      return pageFallback;
    }

    // Protected views — redirect unauthenticated users to login
    if (
      !isAuthenticated &&
      (activeView === "myFiles" || activeView === "profile")
    ) {
      return (
        <Suspense fallback={pageFallback}>
          <LoginPage />
        </Suspense>
      );
    }

    switch (activeView) {
      case "tool":
        return (
          <Suspense fallback={pageFallback}>
            {activeTool ? (
              <ToolPage
                toolId={activeTool}
                onBack={handleBack}
                isAuthenticated={isAuthenticated}
                onRequestLogin={handleRequestLogin}
              />
            ) : (
              <Dashboard onSelectTool={handleSelectTool} />
            )}
          </Suspense>
        );
      case "myFiles":
        return (
          <Suspense fallback={pageFallback}>
            <MyFilesPage onNavigateToDashboard={handleNavigateToDashboard} />
          </Suspense>
        );
      case "profile":
        return (
          <Suspense fallback={pageFallback}>
            <ProfilePage onNavigateToDashboard={handleNavigateToDashboard} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={pageFallback}>
            <Dashboard onSelectTool={handleSelectTool} />
          </Suspense>
        );
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Header
            isAuthenticated={isAuthenticated}
            activeView={activeView}
            onNavigateHome={handleNavigateToDashboard}
            onNavigateMyFiles={() => setActiveView("myFiles")}
            onNavigateProfile={() => setActiveView("profile")}
            onLogout={handleLogout}
            userName={userProfile?.name}
          />
          <main className="flex-1">{renderContent()}</main>
          <Footer />
          {showProfileSetup && <ProfileSetupModal />}
          <Toaster />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
