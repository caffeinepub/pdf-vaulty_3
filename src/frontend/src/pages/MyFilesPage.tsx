import {
  AlertCircle,
  ArrowRight,
  Check,
  Eye,
  FileText,
  FolderOpen,
  Loader2,
  Lock,
  Pencil,
  Search,
  Share2,
  Shield,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import {
  useDeleteFile,
  useGetMyFiles,
  useRenameFile,
  useSaveFile,
} from "../hooks/useQueries";
import { formatBytes } from "../lib/pdfUtils";

interface MyFilesPageProps {
  onNavigateToDashboard: () => void;
}

function formatDate(uploadedAt: bigint): string {
  const ms = Number(uploadedAt / 1_000_000n);
  return new Date(ms).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── PDF Viewer Modal ───────────────────────────────────────────────────────

interface PdfViewerModalProps {
  fileName: string;
  fileUrl: string;
  onClose: () => void;
}

function PdfViewerModal({ fileName, fileUrl, onClose }: PdfViewerModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <dialog
      data-ocid="files.modal"
      open
      className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm w-screen h-screen max-w-none max-h-none m-0 p-0 border-0"
      aria-label={`Viewing ${fileName}`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-950/60 flex-shrink-0">
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
            {fileName}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-ocid="files.close_button"
          className="flex-shrink-0 ml-4 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Close PDF viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          src={fileUrl}
          className="w-full h-full border-0"
          title={fileName}
          aria-label={`PDF viewer for ${fileName}`}
        />
      </div>
    </dialog>
  );
}

// ─── Inline Rename Row ──────────────────────────────────────────────────────

interface RenameInputProps {
  fileId: string;
  currentName: string;
  onDone: () => void;
}

function RenameInput({ fileId, currentName, onDone }: RenameInputProps) {
  const [value, setValue] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);
  const renameFile = useRenameFile();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleConfirm = async () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === currentName) {
      onDone();
      return;
    }
    try {
      await renameFile.mutateAsync({ fileId, newName: trimmed });
      toast.success(`Renamed to "${trimmed}"`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Rename failed";
      toast.error(message);
    } finally {
      onDone();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleConfirm();
    } else if (e.key === "Escape") {
      onDone();
    }
  };

  return (
    <div className="flex items-center gap-1.5 flex-1 min-w-0">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        data-ocid="files.input"
        className="flex-1 min-w-0 text-sm font-semibold text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        placeholder="Enter file name…"
        aria-label="Rename file"
        disabled={renameFile.isPending}
      />
      <button
        type="button"
        onClick={handleConfirm}
        disabled={renameFile.isPending}
        data-ocid="files.save_button"
        className="flex-shrink-0 p-1.5 rounded-md text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Confirm rename"
        title="Confirm rename"
      >
        {renameFile.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}
      </button>
      <button
        type="button"
        onClick={onDone}
        disabled={renameFile.isPending}
        data-ocid="files.cancel_button"
        className="flex-shrink-0 p-1.5 rounded-md text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Cancel rename"
        title="Cancel rename"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function MyFilesPage({
  onNavigateToDashboard,
}: MyFilesPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFileName, setUploadingFileName] = useState<string | null>(
    null,
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [viewerFile, setViewerFile] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: files, isLoading, isError } = useGetMyFiles();
  const saveFile = useSaveFile();
  const deleteFile = useDeleteFile();

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
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
      const message = err instanceof Error ? err.message : "Upload failed";
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
      const message = err instanceof Error ? err.message : "Delete failed";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewPdf = async (fileName: string, fileUrl: string) => {
    try {
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" }),
      );
      setViewerFile({ name: fileName, url: objectUrl });
    } catch {
      // fallback: use direct URL
      setViewerFile({ name: fileName, url: fileUrl });
    }
  };

  const handleCloseViewer = () => {
    if (viewerFile?.url.startsWith("blob:")) {
      URL.revokeObjectURL(viewerFile.url);
    }
    setViewerFile(null);
  };

  const isUploading = !!uploadingFileName;
  const fileCount = files?.length ?? 0;

  const filteredFiles = files?.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const hasSearchResults = (filteredFiles?.length ?? 0) > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {viewerFile && (
        <PdfViewerModal
          fileName={viewerFile.name}
          fileUrl={viewerFile.url}
          onClose={handleCloseViewer}
        />
      )}

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden bg-gradient-to-b from-blue-50/80 to-white dark:from-transparent dark:to-transparent dark:bg-[#0a0a0a]">
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-blue-600 to-purple-600">
            <FolderOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
            My Files
          </h1>
          <p className="text-base text-gray-500 dark:text-white/60 max-w-md mx-auto leading-relaxed">
            Your private PDF vault — encrypted and accessible only to you,
            stored securely on the Internet Computer.
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
                {fileCount} {fileCount === 1 ? "file" : "files"}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={isUploading}
            data-ocid="files.upload_button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-blue-600/20"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {uploadProgress > 0 ? `${uploadProgress}%` : "Uploading…"}
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
          <div
            data-ocid="files.loading_state"
            className="mb-4 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 px-4 py-3"
          >
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
          <div
            data-ocid="files.loading_state"
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-gray-400 dark:text-white/30 text-sm">
              Loading your files…
            </p>
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div
            data-ocid="files.error_state"
            className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-center px-6 gap-3"
          >
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-red-600 dark:text-red-400 font-semibold">
              Failed to load files
            </p>
            <p className="text-red-400 dark:text-red-500/70 text-sm">
              Please try refreshing the page.
            </p>
          </div>
        )}

        {/* Enhanced empty state */}
        {!isLoading && !isError && fileCount === 0 && (
          <div
            data-ocid="files.empty_state"
            className="flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#111111] text-center px-6"
          >
            {/* Illustration */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 border border-blue-100 dark:border-blue-900/30">
                <FileText className="w-10 h-10 text-blue-400 dark:text-blue-500" />
              </div>
              {/* Shield badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>

            <p className="text-gray-800 dark:text-white/80 text-xl font-bold mb-2">
              No files uploaded yet
            </p>
            <p className="text-gray-500 dark:text-white/40 text-sm mb-3 max-w-xs leading-relaxed">
              Upload your first PDF to get started, or use a PDF tool and save
              the result here.
            </p>

            {/* Privacy assurance row */}
            <div className="flex items-center gap-2 mb-8 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30">
              <Lock className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Files are private — only you can access them
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isUploading}
                data-ocid="files.primary_button"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-blue-600/20"
              >
                <Upload className="w-4 h-4" />
                Upload PDF
              </button>
              <button
                type="button"
                onClick={onNavigateToDashboard}
                data-ocid="files.secondary_button"
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white/70 font-semibold rounded-lg transition-colors text-sm"
              >
                Go to PDF Tools
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* File list with search */}
        {!isLoading && !isError && fileCount > 0 && (
          <>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files…"
                data-ocid="files.search_input"
                className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 dark:text-white bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl placeholder:text-gray-400 dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                aria-label="Search files"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:text-white/30 dark:hover:text-white/60 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {searchQuery && !hasSearchResults && (
              <div
                data-ocid="files.empty_state"
                className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111111] text-center px-6"
              >
                <Search className="w-8 h-8 text-gray-300 dark:text-white/20 mb-3" />
                <p className="text-gray-600 dark:text-white/50 text-sm font-medium">
                  No files match &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Clear search
                </button>
              </div>
            )}

            {(searchQuery ? filteredFiles : files)?.map((file, idx) => (
              <div
                key={file.id}
                data-ocid={`files.item.${idx + 1}`}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111111] hover:border-blue-300 dark:hover:border-blue-800/60 transition-colors group mb-3 last:mb-0"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>

                <div className="flex-1 min-w-0">
                  {renamingId === file.id ? (
                    <RenameInput
                      fileId={file.id}
                      currentName={file.name}
                      onDone={() => setRenamingId(null)}
                    />
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
                        {formatBytes(Number(file.size))} · Uploaded{" "}
                        {formatDate(file.uploadedAt)}
                      </p>
                    </>
                  )}
                </div>

                {renamingId !== file.id && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(file.blob.getDirectURL())
                          .then(() => {
                            toast.success("Link copied to clipboard");
                          })
                          .catch(() => {
                            toast.error("Failed to copy link");
                          });
                      }}
                      data-ocid={`files.share_button.${idx + 1}`}
                      className="p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors"
                      title="Copy shareable link"
                      aria-label={`Copy link for ${file.name}`}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleViewPdf(file.name, file.blob.getDirectURL())
                      }
                      data-ocid={`files.secondary_button.${idx + 1}`}
                      className="p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                      title="View PDF"
                      aria-label={`View ${file.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <a
                      href={file.blob.getDirectURL()}
                      download={file.name}
                      data-ocid={`files.button.${idx + 1}`}
                      className="p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                      title="Download"
                      aria-label={`Download ${file.name}`}
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
                        <title>Download</title>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </a>

                    <button
                      type="button"
                      onClick={() => setRenamingId(file.id)}
                      data-ocid={`files.edit_button.${idx + 1}`}
                      className="p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                      title="Rename file"
                      aria-label={`Rename ${file.name}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(file.id, file.name)}
                      disabled={deletingId === file.id}
                      data-ocid={`files.delete_button.${idx + 1}`}
                      className="p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Delete file"
                      aria-label={`Delete ${file.name}`}
                    >
                      {deletingId === file.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {!isLoading && fileCount > 0 && (
          <p className="text-center text-xs text-gray-400 dark:text-white/25 mt-8">
            Files are stored privately on the Internet Computer — only you can
            access them.
          </p>
        )}
      </section>
    </div>
  );
}
