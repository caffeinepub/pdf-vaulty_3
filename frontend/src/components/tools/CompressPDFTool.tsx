import { useState } from 'react';
import { toast } from 'sonner';
import { Zap, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileUploadZone from '../shared/FileUploadZone';
import { getPDFLib, downloadBytes, formatBytes } from '../../lib/pdfUtils';

interface UploadedFile { file: File; id: string; }

export default function CompressPDFTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null);

  const handleCompress = async () => {
    if (files.length === 0) { toast.error('Please upload a PDF file.'); return; }
    setIsProcessing(true);
    setResult(null);
    try {
      const originalSize = files[0].file.size;
      const ab = await files[0].file.arrayBuffer();

      // Initialize PDFDocument from CDN global inside the handler
      const { PDFDocument } = getPDFLib();
      const pdfDoc = await PDFDocument.load(ab, { ignoreEncryption: true });
      const compressedBytes = await pdfDoc.save({ useObjectStreams: true });

      const compressedSize = compressedBytes.length;
      setResult({ original: originalSize, compressed: compressedSize });

      downloadBytes(new Uint8Array(compressedBytes), `compressed-${files[0].file.name}`);
      toast.success('PDF compressed successfully!');
    } catch (err) {
      toast.error('Failed to compress PDF.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const savings = result ? Math.max(0, Math.round((1 - result.compressed / result.original) * 100)) : 0;

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Compress PDF</h2>
            <p className="text-sm text-vault-muted">Reduce file size while preserving content.</p>
          </div>
        </div>
        <FileUploadZone
          accept="application/pdf"
          files={files}
          onFilesChange={setFiles}
          label="Drop a PDF file here or click to browse"
          hint="Single PDF file only"
        />
      </div>

      {result && (
        <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
          <h3 className="font-semibold text-foreground mb-4">Compression Results</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 p-3 rounded-xl bg-vault-hover text-center">
              <p className="text-xs text-vault-muted mb-1">Original</p>
              <p className="font-bold text-foreground">{formatBytes(result.original)}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-vault-amber flex-shrink-0" />
            <div className="flex-1 p-3 rounded-xl bg-green-400/10 border border-green-400/20 text-center">
              <p className="text-xs text-vault-muted mb-1">Compressed</p>
              <p className="font-bold text-green-400">{formatBytes(result.compressed)}</p>
            </div>
          </div>
          {savings > 0 && (
            <p className="text-center text-sm text-vault-amber font-medium mt-3">
              🎉 Saved {savings}% ({formatBytes(result.original - result.compressed)})
            </p>
          )}
          {savings <= 0 && (
            <p className="text-center text-sm text-vault-muted mt-3">
              File is already well-optimized.
            </p>
          )}
        </div>
      )}

      <Button
        onClick={handleCompress}
        disabled={files.length === 0 || isProcessing}
        className="w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2"
      >
        {isProcessing ? (
          <><div className="w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" /> Compressing...</>
        ) : (
          <><Download className="w-4 h-4" /> Compress & Download</>
        )}
      </Button>
    </div>
  );
}
