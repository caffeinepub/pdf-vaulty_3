import { useRef, useState } from 'react';
import {
  FolderOpen,
  FileText,
  Upload,
  Trash2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob } from '../backend';
import { useGetMyFiles, useSaveFile, useDeleteFile } from '../hooks/useQueries';
import { formatBytes } from '../lib/pdfUtils';

interface MyFilesPageProps {
  onNavigateToDashboard: () => void;
}

function formatDate(uploadedAt: bigint): string {
  // uploadedAt is nanoseconds from Time.now() on IC
  const ms = Number(uploadedAt / 1_000_000n);
  return new Date(ms).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function MyFilesPage({ onNavigateToDashboard }: MyFilesPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFileName, setUploadingFileName] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: files, isLoading, isError } = useGetMyFiles();
  const saveFile = useSaveFile();
  const deleteFile = useDeleteFile();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so same file can be re-selected
    e.target.value = '';

    setUploadingFileName(file.name);
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });

      await saveFile.mutateAsync({
        name: file.name,
        size: BigInt(file.size),
        blob,
      });

      toast.success(`"${file.name}" uploaded successfully`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      toast.error(message);
    } finally {
      setUploadingFileName(null);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    setDeletingId(fileId);
    try {
      await deleteFile.mutateAsync(fileId);
      toast.success(`"${fileName}" deleted`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  const isUploading = !!uploadingFileName;
  const fileCount = files?.length ?? 0;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

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
            Your private PDF vault — securely stored and accessible only to you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Stored Files
            {!isLoading && (
              <span className="ml-2 text-sm font-normal text-gray-400 dark:text-white/30">
                {fileCount} {fileCount === 1 ? 'file' : 'files'}
              </span>
            )}
          </h2>
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-blue-600/20"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {uploadProgress > 0 ? `${uploadProgress}%` : 'Uploading…'}
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload PDF
              </>
            )}
          </button>
        </div>

        {/* Upload progress bar */}
        {isUploading && (
          <div className="mb-4 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium truncate max-w-xs">
                {uploadingFileName}
              </span>
              <span className="text-xs text-blue-500 dark:text-blue-400 ml-2 flex-shrink-0">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-gray-400 dark:text-white/30 text-sm">Loading your files…</p>
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-center px-6 gap-3">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-red-600 dark:text-red-400 font-semibold">Failed to load files</p>
            <p className="text-red-400 dark:text-red-500/70 text-sm">
              Please try refreshing the page.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && fileCount === 0 && (
          <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111111] text-center px-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/[0.08] shadow-sm">
              <FileText className="w-9 h-9 text-gray-300 dark:text-white/20" />
            </div>
            <p className="text-gray-700 dark:text-white/70 text-lg font-semibold mb-2">
              No files uploaded yet
            </p>
            <p className="text-gray-400 dark:text-white/30 text-sm mb-8 max-w-xs">
              Upload your first PDF to get started, or use a PDF tool and save the result here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleUploadClick}
                disabled={isUploading}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-blue-600/20"
              >
                <Upload className="w-4 h-4" />
                Upload PDF
              </button>
              <button
                onClick={onNavigateToDashboard}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white/70 font-semibold rounded-lg transition-colors text-sm"
              >
                Go to PDF Tools
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* File list */}
        {!isLoading && !isError && fileCount > 0 && (
          <div className="flex flex-col gap-3">
            {files!.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 px-5 py-4 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111111] hover:border-blue-300 dark:hover:border-blue-800/60 transition-colors group"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
                    {formatBytes(Number(file.size))} · Uploaded {formatDate(file.uploadedAt)}
                  </p>
                </div>

                {/* Download link */}
                <a
                  href={file.blob.getDirectURL()}
                  download={file.name}
                  className="flex-shrink-0 p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                  title="Download"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(file.id, file.name)}
                  disabled={deletingId === file.id}
                  className="flex-shrink-0 p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Delete file"
                >
                  {deletingId === file.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer note */}
        {!isLoading && fileCount > 0 && (
          <p className="text-center text-xs text-gray-400 dark:text-white/25 mt-8">
            Files are stored privately on the Internet Computer — only you can access them.
          </p>
        )}
      </section>
    </div>
  );
}
