import React, { useState, useCallback } from 'react';
import { Upload, FileText, Download, Loader2, AlertCircle, CheckCircle2, TrendingDown, Zap, Gauge } from 'lucide-react';
import { getPDFLib, downloadBytes, formatBytes } from '@/lib/pdfUtils';

type CompressionLevel = 'standard' | 'high';

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressedBytes: Uint8Array;
  fileName: string;
  level: CompressionLevel;
}

// Decode raw image bytes to an ImageBitmap using the browser
async function decodeImageBytes(bytes: Uint8Array, mimeType: string): Promise<ImageBitmap | null> {
  try {
    const blob = new Blob([bytes.buffer as ArrayBuffer], { type: mimeType });
    return await createImageBitmap(blob);
  } catch {
    return null;
  }
}

// Downsample an ImageBitmap to a canvas and return JPEG bytes
function imageToJpegBytes(
  bitmap: ImageBitmap,
  maxDimension: number,
  quality: number
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    let w = bitmap.width;
    let h = bitmap.height;

    if (w > maxDimension || h > maxDimension) {
      const scale = maxDimension / Math.max(w, h);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    ctx.drawImage(bitmap, 0, 0, w, h);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas toBlob failed'));
          return;
        }
        blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf))).catch(reject);
      },
      'image/jpeg',
      quality
    );
  });
}

// Compression settings per level
const COMPRESSION_SETTINGS = {
  standard: {
    maxDimension: 1024,
    jpegQuality: 0.75,
    savingsThreshold: 0.9, // replace if new is < 90% of original
  },
  high: {
    maxDimension: 600,   // ~72 DPI equivalent for typical letter-size pages
    jpegQuality: 0.45,
    savingsThreshold: 0.95, // more aggressive: replace if new is < 95% of original
  },
};

async function compressPDF(
  fileBytes: Uint8Array,
  fileName: string,
  level: CompressionLevel,
  onProgress?: (msg: string) => void
): Promise<CompressionResult> {
  const PDFLib = getPDFLib();
  const originalSize = fileBytes.length;
  const settings = COMPRESSION_SETTINGS[level];

  onProgress?.('Loading PDF…');
  const pdfDoc = await PDFLib.PDFDocument.load(fileBytes, { ignoreEncryption: true });

  // Strip metadata
  onProgress?.('Stripping metadata…');
  pdfDoc.setTitle('');
  pdfDoc.setAuthor('');
  pdfDoc.setSubject('');
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer('');
  pdfDoc.setCreator('');

  // Attempt image compression via raw context
  onProgress?.('Scanning for images…');
  let imagesSaved = 0;

  try {
    const context = pdfDoc.context;
    const indirectObjects = context.enumerateIndirectObjects();

    const imageEntries: Array<{ ref: unknown; stream: unknown }> = [];

    for (const [ref, obj] of indirectObjects) {
      if (obj instanceof (PDFLib as any).PDFRawStream) {
        const dict = (obj as any).dict;
        const subtype = dict.get((PDFLib as any).PDFName.of('Subtype'));
        if (subtype && subtype.toString() === '/Image') {
          imageEntries.push({ ref, stream: obj });
        }
      }
    }

    onProgress?.(`Found ${imageEntries.length} image(s), compressing…`);

    for (let i = 0; i < imageEntries.length; i++) {
      const { ref, stream } = imageEntries[i] as any;
      const dict = stream.dict;

      const widthObj = dict.get((PDFLib as any).PDFName.of('Width'));
      const heightObj = dict.get((PDFLib as any).PDFName.of('Height'));
      const filterObj = dict.get((PDFLib as any).PDFName.of('Filter'));
      const colorSpaceObj = dict.get((PDFLib as any).PDFName.of('ColorSpace'));

      const width = widthObj ? Number(widthObj.toString()) : 0;
      const height = heightObj ? Number(heightObj.toString()) : 0;
      const filterStr = filterObj ? filterObj.toString() : '';
      const colorSpaceStr = colorSpaceObj ? colorSpaceObj.toString() : '';

      const isMask = dict.get((PDFLib as any).PDFName.of('ImageMask'));
      if (isMask) continue;
      if (width < 64 || height < 64) continue;
      if (colorSpaceStr.includes('Indexed') || colorSpaceStr.includes('Separation')) continue;

      const rawBytes: Uint8Array = stream.contents;

      // Handle FlateDecode / LZWDecode (raw pixel data after decode)
      if (filterStr.includes('FlateDecode') || filterStr.includes('LZWDecode')) {
        try {
          const components = colorSpaceStr.includes('CMYK') ? 4 : colorSpaceStr.includes('Gray') ? 1 : 3;
          if (components === 3 && rawBytes.length === width * height * 3) {
            const rgba = new Uint8ClampedArray(width * height * 4);
            for (let p = 0; p < width * height; p++) {
              rgba[p * 4] = rawBytes[p * 3];
              rgba[p * 4 + 1] = rawBytes[p * 3 + 1];
              rgba[p * 4 + 2] = rawBytes[p * 3 + 2];
              rgba[p * 4 + 3] = 255;
            }
            const imageData = new ImageData(rgba, width, height);
            const bitmap = await createImageBitmap(imageData);

            const maxDim = Math.max(width, height) > settings.maxDimension
              ? settings.maxDimension
              : Math.max(width, height);
            const jpegBytes = await imageToJpegBytes(bitmap, maxDim, settings.jpegQuality);
            bitmap.close();

            if (jpegBytes.length < rawBytes.length * settings.savingsThreshold) {
              const newDict = (PDFLib as any).PDFDict.withContext(context);
              newDict.set((PDFLib as any).PDFName.of('Type'), (PDFLib as any).PDFName.of('XObject'));
              newDict.set((PDFLib as any).PDFName.of('Subtype'), (PDFLib as any).PDFName.of('Image'));
              newDict.set((PDFLib as any).PDFName.of('Width'), (PDFLib as any).PDFNumber.of(width));
              newDict.set((PDFLib as any).PDFName.of('Height'), (PDFLib as any).PDFNumber.of(height));
              newDict.set((PDFLib as any).PDFName.of('ColorSpace'), (PDFLib as any).PDFName.of('DeviceRGB'));
              newDict.set((PDFLib as any).PDFName.of('BitsPerComponent'), (PDFLib as any).PDFNumber.of(8));
              newDict.set((PDFLib as any).PDFName.of('Filter'), (PDFLib as any).PDFName.of('DCTDecode'));
              newDict.set((PDFLib as any).PDFName.of('Length'), (PDFLib as any).PDFNumber.of(jpegBytes.length));
              const newStream = (PDFLib as any).PDFRawStream.of(newDict, jpegBytes);
              context.assign(ref, newStream);
              imagesSaved++;
            }
          }
        } catch {
          // Skip this image if raw processing fails
        }
        continue;
      }

      // Handle JPEG (DCTDecode) and JPEG2000 (JPXDecode)
      let mimeType = '';
      if (filterStr.includes('DCTDecode')) {
        mimeType = 'image/jpeg';
      } else if (filterStr.includes('JPXDecode')) {
        mimeType = 'image/jp2';
      } else {
        continue;
      }

      try {
        const bitmap = await decodeImageBytes(rawBytes, mimeType);
        if (!bitmap) continue;

        const maxDim = Math.max(width, height) > settings.maxDimension
          ? settings.maxDimension
          : Math.max(width, height);
        const jpegBytes = await imageToJpegBytes(bitmap, maxDim, settings.jpegQuality);

        const newWidth = bitmap.width > maxDim
          ? Math.round(width * (maxDim / Math.max(width, height)))
          : width;
        const newHeight = bitmap.height > maxDim
          ? Math.round(height * (maxDim / Math.max(width, height)))
          : height;

        bitmap.close();

        if (jpegBytes.length < rawBytes.length * settings.savingsThreshold) {
          const newDict = (PDFLib as any).PDFDict.withContext(context);
          newDict.set((PDFLib as any).PDFName.of('Type'), (PDFLib as any).PDFName.of('XObject'));
          newDict.set((PDFLib as any).PDFName.of('Subtype'), (PDFLib as any).PDFName.of('Image'));
          newDict.set((PDFLib as any).PDFName.of('Width'), (PDFLib as any).PDFNumber.of(newWidth));
          newDict.set((PDFLib as any).PDFName.of('Height'), (PDFLib as any).PDFNumber.of(newHeight));
          newDict.set((PDFLib as any).PDFName.of('ColorSpace'), (PDFLib as any).PDFName.of('DeviceRGB'));
          newDict.set((PDFLib as any).PDFName.of('BitsPerComponent'), (PDFLib as any).PDFNumber.of(8));
          newDict.set((PDFLib as any).PDFName.of('Filter'), (PDFLib as any).PDFName.of('DCTDecode'));
          newDict.set((PDFLib as any).PDFName.of('Length'), (PDFLib as any).PDFNumber.of(jpegBytes.length));
          const newStream = (PDFLib as any).PDFRawStream.of(newDict, jpegBytes);
          context.assign(ref, newStream);
          imagesSaved++;
        }
      } catch {
        // Skip this image if processing fails
      }
    }
  } catch (err) {
    console.warn('Image compression failed, falling back to metadata-only compression:', err);
  }

  onProgress?.(`Saving compressed PDF (${imagesSaved} image(s) optimized)…`);
  const compressedBytes = await pdfDoc.save({ useObjectStreams: true });

  return {
    originalSize,
    compressedSize: compressedBytes.length,
    compressedBytes,
    fileName,
    level,
  };
}

export default function CompressPDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('standard');

  const handleFile = useCallback((f: File) => {
    if (!f.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file.');
      return;
    }
    setFile(f);
    setResult(null);
    setError(null);
    setProgress('');
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const fileBytes = new Uint8Array(arrayBuffer);
      const res = await compressPDF(fileBytes, file.name, compressionLevel, setProgress);
      setResult(res);
    } catch (err: any) {
      setError(err?.message || 'Compression failed. Please try another file.');
    } finally {
      setIsProcessing(false);
      setProgress('');
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const useOriginal = result.compressedSize >= result.originalSize;

    if (useOriginal && file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const suffix = result.level === 'high' ? '_compressed_high' : '_compressed';
      const baseName = result.fileName.replace(/\.pdf$/i, '');
      downloadBytes(result.compressedBytes, `${baseName}${suffix}.pdf`);
    }
  };

  const reductionPct =
    result && result.originalSize > 0
      ? Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100)
      : 0;

  const noReduction = result && result.compressedSize >= result.originalSize;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/60 hover:bg-muted/30'
        }`}
        onClick={() => document.getElementById('compress-file-input')?.click()}
      >
        <input
          id="compress-file-input"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleInputChange}
        />
        <Upload className="mx-auto mb-3 text-muted-foreground" size={36} />
        <p className="font-medium text-foreground">Drop a PDF here or click to browse</p>
        <p className="text-sm text-muted-foreground mt-1">Supports standard PDF files</p>
      </div>

      {/* Selected File */}
      {file && !result && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/40 border border-border">
          <FileText size={20} className="text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
        </div>
      )}

      {/* Compression Level Selector */}
      {file && !result && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Compression Level</p>
          <div className="grid grid-cols-2 gap-3">
            {/* Standard Option */}
            <button
              type="button"
              onClick={() => setCompressionLevel('standard')}
              disabled={isProcessing}
              className={`relative flex flex-col items-start gap-1.5 p-4 rounded-xl border-2 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                compressionLevel === 'standard'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/40 hover:bg-muted/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <Gauge
                  size={18}
                  className={compressionLevel === 'standard' ? 'text-primary' : 'text-muted-foreground'}
                />
                <span className={`font-semibold text-sm ${compressionLevel === 'standard' ? 'text-primary' : 'text-foreground'}`}>
                  Standard
                </span>
                {compressionLevel === 'standard' && (
                  <span className="ml-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-medium">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Balanced quality &amp; size. Good for most documents.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Max 1024px · JPEG 75%
              </p>
            </button>

            {/* High Option */}
            <button
              type="button"
              onClick={() => setCompressionLevel('high')}
              disabled={isProcessing}
              className={`relative flex flex-col items-start gap-1.5 p-4 rounded-xl border-2 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                compressionLevel === 'high'
                  ? 'border-orange-500 bg-orange-500/5 dark:bg-orange-500/10'
                  : 'border-border hover:border-orange-400/50 hover:bg-muted/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap
                  size={18}
                  className={compressionLevel === 'high' ? 'text-orange-500' : 'text-muted-foreground'}
                />
                <span className={`font-semibold text-sm ${compressionLevel === 'high' ? 'text-orange-500' : 'text-foreground'}`}>
                  High
                </span>
                {compressionLevel === 'high' && (
                  <span className="ml-auto text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-medium">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Maximum size reduction. Lower image quality.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Max 600px · JPEG 45%
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Progress */}
      {isProcessing && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <Loader2 size={18} className="animate-spin text-primary shrink-0" />
          <p className="text-sm text-foreground">{progress || 'Processing…'}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`p-5 rounded-xl border ${noReduction ? 'border-amber-400/40 bg-amber-50/30 dark:bg-amber-900/10' : 'border-green-500/40 bg-green-50/30 dark:bg-green-900/10'}`}>
          <div className="flex items-center gap-2 mb-4">
            {noReduction ? (
              <AlertCircle size={20} className="text-amber-500" />
            ) : (
              <CheckCircle2 size={20} className="text-green-500" />
            )}
            <span className="font-semibold text-foreground">
              {noReduction ? 'File could not be compressed further' : 'Compression complete!'}
            </span>
            {!noReduction && (
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
                result.level === 'high'
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {result.level === 'high' ? 'High' : 'Standard'} compression
              </span>
            )}
          </div>

          {!noReduction && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 rounded-lg bg-background/60 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Original</p>
                <p className="font-semibold text-sm">{formatBytes(result.originalSize)}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/60 border border-border flex flex-col items-center justify-center">
                <TrendingDown size={16} className="text-green-500 mb-1" />
                <p className="font-bold text-green-600 dark:text-green-400 text-lg">{reductionPct}%</p>
                <p className="text-xs text-muted-foreground">saved</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/60 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Compressed</p>
                <p className="font-semibold text-sm">{formatBytes(result.compressedSize)}</p>
              </div>
            </div>
          )}

          {noReduction && (
            <p className="text-sm text-muted-foreground mb-4">
              This PDF is already well-optimized. The original file will be downloaded.
            </p>
          )}

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <Download size={16} />
            {noReduction ? 'Download Original' : 'Download Compressed PDF'}
          </button>
        </div>
      )}

      {/* Compress Button */}
      {file && !result && (
        <button
          onClick={handleCompress}
          disabled={isProcessing}
          className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
            compressionLevel === 'high'
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Compressing…
            </>
          ) : (
            <>
              {compressionLevel === 'high' ? <Zap size={18} /> : <TrendingDown size={18} />}
              {compressionLevel === 'high' ? 'High Compress PDF' : 'Compress PDF'}
            </>
          )}
        </button>
      )}

      {/* Reset */}
      {result && (
        <button
          onClick={() => { setFile(null); setResult(null); setError(null); }}
          className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Compress another file
        </button>
      )}
    </div>
  );
}
