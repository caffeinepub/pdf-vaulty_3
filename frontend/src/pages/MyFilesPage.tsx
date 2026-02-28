import { FolderOpen, FileText, ArrowRight } from 'lucide-react';

interface MyFilesPageProps {
  onNavigateToDashboard: () => void;
}

export default function MyFilesPage({ onNavigateToDashboard }: MyFilesPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden bg-gradient-to-b from-blue-50/80 to-white dark:from-transparent dark:to-transparent dark:bg-[#0a0a0a]">
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-blue-50 dark:bg-[#1e3a5f]">
            <FolderOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
            My Files
          </h1>
          <p className="text-base text-gray-500 dark:text-white/60 max-w-md mx-auto leading-relaxed">
            Access and manage your previously processed PDF files.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Recent files header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Files</h2>
          <span className="text-sm text-gray-400 dark:text-white/30">0 files</span>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111111] text-center px-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/[0.08] shadow-sm">
            <FileText className="w-9 h-9 text-gray-300 dark:text-white/20" />
          </div>
          <p className="text-gray-700 dark:text-white/70 text-lg font-semibold mb-2">No files yet</p>
          <p className="text-gray-400 dark:text-white/30 text-sm mb-8 max-w-xs">
            Start by using a PDF tool. Your processed files will appear here.
          </p>
          <button
            onClick={onNavigateToDashboard}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-blue-600/20"
          >
            Go to PDF Tools
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Info note */}
        <p className="text-center text-xs text-gray-400 dark:text-white/25 mt-6">
          File history will be available in a future update.
        </p>
      </section>
    </div>
  );
}
