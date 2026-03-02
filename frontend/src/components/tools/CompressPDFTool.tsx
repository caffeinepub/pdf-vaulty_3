import React, { useState } from 'react';
import FileUploadZone from '@/components/shared/FileUploadZone';
import { Button } from '@/components/ui/button';
import { getPDFLib, formatBytes } from '@/lib/pdfUtils';
import { Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadedFile {
  file: File;
  id: string;
}

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressedBytes: Uint8Array;
  fileName: string;
}

// Access pdf.js from CDN global
function getPdfjsLib(): PdfjsLib {
  const lib = window.pdfjsLib;
  if (!lib) throw new Error('pdf.js not loaded. Please refresh the page.');
  return lib;
}

async function compressPDFCanvas(file: File): Promise<CompressionResult> {
  const PDFLib = getPDFLib();
  const pdfjsLib = getPdfjsLib();

  // Standard compression settings
  const scale = 0.85;
  const jpegQuality = 0.70;

  // Read original file
  const originalBytes = new Uint8Array(await file.arrayBuffer());

  // Load with pdf.js for rendering (pass a copy to avoid detached buffer issues)
  const loadingTask = pdfjsLib.getDocument({ data: originalBytes.slice() });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  // Create new pdf-lib document
  const newPdf = await PDFLib.PDFDocument.create();

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);

    const viewport = page.getViewport({ scale });

    const canvasWidth = Math.floor(viewport.width);
    const canvasHeight = Math.floor(viewport.height);

    // Create offscreen canvas
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Render PDF page to canvas
    await page.render({ canvasContext: ctx, viewport }).promise;

    // Convert canvas to JPEG bytes
    const jpegDataUrl = canvas.toDataURL('image/jpeg', jpegQuality);
    const base64Data = jpegDataUrl.split(',')[1];
    const jpegBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    // Embed JPEG into new pdf-lib document
    const jpegImage = await newPdf.embedJpg(jpegBytes);
    const newPage = newPdf.addPage([canvasWidth, canvasHeight]);
    newPage.drawImage(jpegImage, {
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
    });
  }

  // Strip all metadata
  newPdf.setTitle('');
  newPdf.setAuthor('');
  newPdf.setSubject('');
  newPdf.setKeywords([]);
  newPdf.setCreator('');
  newPdf.setProducer('');

  // Save with object streams for additional compression
  const compressedBytes = await newPdf.save({ useObjectStreams: true });

  return {
    originalSize: originalBytes.length,
    compressedSize: compressedBytes.length,
    compressedBytes,
    fileName: file.name.replace(/\.pdf$/i, '') + '_compressed.pdf',
  };
}

export default function CompressPDFTool() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  const handleCompress = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress('Rendering pages and compressing...');

    try {
      const res = await compressPDFCanvas(uploadedFiles[0].file);
      setResult(res);
      setProgress('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Compression failed';
      setError(msg);
      setProgress('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.compressedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const percentSaved =
    result && result.originalSize > 0
      ? Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100)
      : 0;

  const couldNotReduce = result !== null && result.compressedSize >= result.originalSize;

  return (
    <div className="space-y-6">
      <FileUploadZone
        accept=".pdf"
        multiple={false}
        files={uploadedFiles}
        onFilesChange={setUploadedFiles}
        label="Drop your PDF here or click to browse"
        hint="Supports PDF files"
      />

      {/* Compress Button */}
      <Button
        onClick={handleCompress}
        disabled={uploadedFiles.length === 0 || isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {progress || 'Compressing...'}
          </>
        ) : (
          'Compress PDF'
        )}
      </Button>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-500 font-semibold">
              <CheckCircle className="h-5 w-5" />
              Compression complete!
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
              Standard
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/40 p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Original</p>
              <p className="font-bold text-foreground">{formatBytes(result.originalSize)}</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Saved</p>
              <p
                className={`font-bold text-lg ${
                  percentSaved > 0 ? 'text-green-500' : 'text-muted-foreground'
                }`}
              >
                {percentSaved > 0 ? `${percentSaved}%` : '0%'}
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Compressed</p>
              <p className="font-bold text-foreground">{formatBytes(result.compressedSize)}</p>
            </div>
          </div>

          {/* Could not reduce message */}
          {couldNotReduce && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              The file could not be reduced further. The PDF may already be optimized.
            </div>
          )}

          {/* Download */}
          <Button onClick={handleDownload} className="w-full" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Compressed PDF
          </Button>
        </div>
      )}
    </div>
  );
}
