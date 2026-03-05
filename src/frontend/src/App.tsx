import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProfileSetupModal from "./components/ProfileSetupModal";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "./hooks/useQueries";
import AnalyticsPage from "./pages/AnalyticsPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import MyFilesPage from "./pages/MyFilesPage";
import ToolPage from "./pages/ToolPage";

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
  | "add-watermark";

export type AppView = "dashboard" | "tool" | "analytics" | "myFiles";

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [activeView, setActiveView] = useState<AppView>("dashboard");
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const queryClient = useQueryClient();

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

  const renderContent = () => {
    if (isInitializing) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return <LoginPage />;
    }

    switch (activeView) {
      case "tool":
        return activeTool ? (
          <ToolPage toolId={activeTool} onBack={handleBack} />
        ) : (
          <Dashboard onSelectTool={handleSelectTool} />
        );
      case "analytics":
        return (
          <AnalyticsPage onNavigateToDashboard={handleNavigateToDashboard} />
        );
      case "myFiles":
        return (
          <MyFilesPage onNavigateToDashboard={handleNavigateToDashboard} />
        );
      default:
        return <Dashboard onSelectTool={handleSelectTool} />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header
          isAuthenticated={isAuthenticated}
          activeView={activeView}
          onNavigateHome={handleNavigateToDashboard}
          onNavigateAnalytics={() => setActiveView("analytics")}
          onNavigateMyFiles={() => setActiveView("myFiles")}
          onLogout={handleLogout}
          userName={userProfile?.name}
        />
        <main className="flex-1">{renderContent()}</main>
        <Footer />
        {showProfileSetup && <ProfileSetupModal />}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
