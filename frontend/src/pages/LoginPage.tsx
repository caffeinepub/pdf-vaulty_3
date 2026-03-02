import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Layers, FileText, Minimize2, Lock, RotateCw, FileInput, Shield, Zap } from 'lucide-react';

const tools = [
  {
    icon: Layers,
    label: 'Merge PDFs',
    description: 'Combine multiple PDF files into a single document',
  },
  {
    icon: FileText,
    label: 'Split PDFs',
    description: 'Extract specific pages or split documents into separate files',
  },
  {
    icon: Minimize2,
    label: 'Compress PDFs',
    description: 'Reduce file size while maintaining quality',
  },
  {
    icon: Lock,
    label: 'Protect PDFs',
    description: 'Add or remove password protection from your documents',
  },
  {
    icon: RotateCw,
    label: 'Rotate PDFs',
    description: 'Rotate PDF pages by 90, 180, or 270 degrees',
  },
  {
    icon: FileInput,
    label: 'Convert into PDF',
    description: 'Convert Word, Excel, and images to PDF',
  },
];

export default function LoginPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  const scrollToTools = () => {
    document.getElementById('login-tools-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden bg-gradient-to-b from-blue-50/80 to-white dark:from-transparent dark:to-transparent dark:bg-[#0a0a0a]">
        {/* Radial blue glow — dark mode only */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
            Your Complete{' '}
            <span className="text-blue-600 dark:text-blue-400">PDF Vaulty</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
            Merge, split, compress, and manage your PDF files with ease. All tools in one place.
          </p>
          <button
            onClick={scrollToTools}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-base shadow-md shadow-blue-600/20"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Tools Section */}
      <section id="login-tools-section" className="px-4 sm:px-6 lg:px-8 pb-16 max-w-4xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Powerful PDF Tools</h2>
          <p className="text-blue-600 dark:text-white/50 text-base">Everything you need to work with PDF files</p>
        </div>

        {/* 2-column tool grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map(({ icon: Icon, label, description }) => (
            <button
              key={label}
              onClick={login}
              disabled={isLoggingIn}
              className="group flex flex-col items-start p-6 rounded-xl text-left transition-all duration-200 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/[0.08] hover:border-blue-300 dark:hover:border-white/20 hover:shadow-md disabled:opacity-60"
            >
              {/* Icon box */}
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-blue-50 dark:bg-[#1e3a5f]">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1.5">{label}</h3>
              <p className="text-sm text-gray-500 dark:text-white/50 leading-snug">{description}</p>
            </button>
          ))}
        </div>

        {/* Login CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 dark:text-white/50 text-sm mb-4">Sign in to start using all PDF tools</p>
          <button
            onClick={login}
            disabled={isLoggingIn}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-base shadow-md shadow-blue-600/20 disabled:opacity-50"
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Logging in...
              </span>
            ) : (
              'Login to Get Started'
            )}
          </button>
        </div>
      </section>

      {/* Why Use PDF Vaulty strip */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-[#111111]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {/* Easy to Use */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]">
              <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Easy to Use</h3>
              <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">
                Simple and intuitive interface for all your PDF needs
              </p>
            </div>
          </div>

          {/* Secure & Private */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent">
              <Shield className="w-7 h-7 text-gray-400 dark:text-white/40" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Secure &amp; Private</h3>
              <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">
                Your files are processed securely and never shared
              </p>
            </div>
          </div>

          {/* Powerful Tools */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]">
              <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Powerful Tools</h3>
              <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">
                Professional-grade PDF tools at your fingertips
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
