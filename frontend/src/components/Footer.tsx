export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'pdf-vaulty'
  );

  return (
    <footer className="border-t border-vault-border bg-vault-surface py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-vault-muted">
          <div className="flex items-center gap-2">
            <span>© {year} PDF Vaulty. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <span className="text-vault-amber">♥</span>
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vault-amber hover:text-vault-gold font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
