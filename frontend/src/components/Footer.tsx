export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'pdf-vaulty'
  );

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d0d0d] py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
          <span>© {year} PDF Vaulty. All rights reserved.</span>
          <span className="flex flex-row items-center gap-1">
            <span>Built with</span>
            <span className="text-blue-500">♥</span>
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
      {/* Purple accent border at bottom */}
      <div className="h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent mt-4" />
    </footer>
  );
}
