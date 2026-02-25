import { useRef, useState, useCallback } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadedFile {
  file: File;
  id: string;
}

interface FileUploadZoneProps {
  accept: string;
  multiple?: boolean;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  label?: string;
  hint?: string;
  maxFiles?: number;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileIcon(file: File) {
  if (file.type.startsWith('image/')) return <ImageIcon className="w-4 h-4 text-pink-400" />;
  return <FileText className="w-4 h-4 text-vault-amber" />;
}

export default function FileUploadZone({
  accept,
  multiple = false,
  files,
  onFilesChange,
  label = 'Drop files here or click to browse',
  hint,
  maxFiles,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;
      const arr = Array.from(newFiles).map((f) => ({ file: f, id: `${f.name}-${Date.now()}-${Math.random()}` }));
      if (multiple) {
        const combined = [...files, ...arr];
        onFilesChange(maxFiles ? combined.slice(0, maxFiles) : combined);
      } else {
        onFilesChange([arr[0]]);
      }
    },
    [files, multiple, onFilesChange, maxFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (id: string) => {
    onFilesChange(files.filter((f) => f.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const arr = [...files];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    onFilesChange(arr);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    const arr = [...files];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    onFilesChange(arr);
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
          isDragging
            ? 'border-vault-amber bg-vault-amber/10 scale-[1.01]'
            : 'border-vault-border bg-vault-surface hover:border-vault-amber/50 hover:bg-vault-hover'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
          onClick={(e) => ((e.target as HTMLInputElement).value = '')}
        />
        <div className="flex flex-col items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isDragging ? 'bg-vault-amber/20' : 'bg-vault-hover'}`}>
            <Upload className={`w-7 h-7 transition-colors ${isDragging ? 'text-vault-amber' : 'text-vault-muted'}`} />
          </div>
          <div>
            <p className="font-semibold text-foreground">{label}</p>
            {hint && <p className="text-sm text-vault-muted mt-1">{hint}</p>}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-vault-border text-vault-muted hover:text-foreground hover:border-vault-amber/50 pointer-events-none"
          >
            Browse Files
          </Button>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-vault-muted">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </p>
          {files.map((f, index) => (
            <div
              key={f.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-vault-surface border border-vault-border"
            >
              {getFileIcon(f.file)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{f.file.name}</p>
                <p className="text-xs text-vault-muted">{formatBytes(f.file.size)}</p>
              </div>
              {multiple && files.length > 1 && (
                <div className="flex gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); moveUp(index); }}
                    disabled={index === 0}
                    className="w-6 h-6 rounded flex items-center justify-center text-vault-muted hover:text-foreground hover:bg-vault-hover disabled:opacity-30 text-xs"
                  >
                    ↑
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveDown(index); }}
                    disabled={index === files.length - 1}
                    className="w-6 h-6 rounded flex items-center justify-center text-vault-muted hover:text-foreground hover:bg-vault-hover disabled:opacity-30 text-xs"
                  >
                    ↓
                  </button>
                </div>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(f.id); }}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-vault-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
