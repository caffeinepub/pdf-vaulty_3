import { useState } from 'react';
import { toast } from 'sonner';
import { Scissors, Download, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FileUploadZone from '../shared/FileUploadZone';
import { getPDFLib, downloadBytes } from '../../lib/pdfUtils';

interface UploadedFile { file: File; id: string; }

type SplitMode = 'all' | 'range' | 'specific' | 'count';

export default function SplitPDFTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [splitMode, setSplitMode] = useState<SplitMode>('all');

  // Range mode
  const [rangeStart, setRangeStart] = useState('1');
  const [rangeEnd, setRangeEnd] = useState('1');

  // Specific pages mode
  const [specificPages, setSpecificPages] = useState('');
  const [specificPagesError, setSpecificPagesError] = useState('');

  // By page count mode
  const [pagesPerChunk, setPagesPerChunk] = useState('1');
  const [pagesPerChunkError, setPagesPerChunkError] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (newFiles: UploadedFile[]) => {
    setFiles(newFiles);
    setPageCount(null);
    setSpecificPagesError('');
    setPagesPerChunkError('');
    if (newFiles.length > 0) {
      try {
        const ab = await newFiles[0].file.arrayBuffer();
        const { PDFDocument } = getPDFLib();
        const pdf = await PDFDocument.load(ab);
        const count = pdf.getPageCount();
        setPageCount(count);
        setRangeEnd(String(count));
      } catch {
        toast.error('Could not read PDF. Please ensure it is a valid PDF file.');
      }
    }
  };

  const parseSpecificPages = (): number[] | null => {
    if (!specificPages.trim()) {
      setSpecificPagesError('Please enter at least one page number.');
      return null;
    }
    const parts = specificPages.split(',').map((s) => s.trim()).filter(Boolean);
    const nums: number[] = [];
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (isNaN(n) || String(n) !== part) {
        setSpecificPagesError(`"${part}" is not a valid page number.`);
        return null;
      }
      if (n < 1 || (pageCount !== null && n > pageCount)) {
        setSpecificPagesError(`Page ${n} is out of range (1–${pageCount}).`);
        return null;
      }
      nums.push(n);
    }
    // Deduplicate while preserving order
    const unique = [...new Set(nums)];
    setSpecificPagesError('');
    return unique;
  };

  const validatePagesPerChunk = (): number | null => {
    const n = parseInt(pagesPerChunk, 10);
    if (isNaN(n) || n < 1) {
      setPagesPerChunkError('Pages per split must be at least 1.');
      return null;
    }
    if (pageCount !== null && n >= pageCount) {
      setPagesPerChunkError(`Pages per split must be less than total pages (${pageCount}).`);
      return null;
    }
    setPagesPerChunkError('');
    return n;
  };

  const handleSplit = async () => {
    if (files.length === 0) { toast.error('Please upload a PDF file.'); return; }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      const { PDFDocument } = getPDFLib();
      const srcPdf = await PDFDocument.load(ab);
      const total = srcPdf.getPageCount();

      if (splitMode === 'all') {
        for (let i = 0; i < total; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(srcPdf, [i]);
          newPdf.addPage(page);
          const bytes = await newPdf.save();
          downloadBytes(new Uint8Array(bytes), `page-${i + 1}.pdf`);
        }
        toast.success(`Split into ${total} pages!`);

      } else if (splitMode === 'range') {
        const start = Math.max(1, parseInt(rangeStart)) - 1;
        const end = Math.min(total, parseInt(rangeEnd)) - 1;
        if (start > end) { toast.error('Invalid page range.'); return; }
        const newPdf = await PDFDocument.create();
        const indices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        const pages = await newPdf.copyPages(srcPdf, indices);
        pages.forEach((p) => newPdf.addPage(p));
        const bytes = await newPdf.save();
        downloadBytes(new Uint8Array(bytes), `pages-${start + 1}-to-${end + 1}.pdf`);
        toast.success('Range extracted successfully!');

      } else if (splitMode === 'specific') {
        const pageNums = parseSpecificPages();
        if (!pageNums) { setIsProcessing(false); return; }
        const newPdf = await PDFDocument.create();
        const indices = pageNums.map((n) => n - 1);
        const pages = await newPdf.copyPages(srcPdf, indices);
        pages.forEach((p) => newPdf.addPage(p));
        const bytes = await newPdf.save();
        const label = pageNums.join('-');
        downloadBytes(new Uint8Array(bytes), `split_specific_pages_${label}.pdf`);
        toast.success(`Extracted ${pageNums.length} specific page(s)!`);

      } else if (splitMode === 'count') {
        const chunkSize = validatePagesPerChunk();
        if (!chunkSize) { setIsProcessing(false); return; }
        const chunkCount = Math.ceil(total / chunkSize);
        for (let c = 0; c < chunkCount; c++) {
          const startIdx = c * chunkSize;
          const endIdx = Math.min(startIdx + chunkSize - 1, total - 1);
          const indices = Array.from({ length: endIdx - startIdx + 1 }, (_, i) => startIdx + i);
          const newPdf = await PDFDocument.create();
          const pages = await newPdf.copyPages(srcPdf, indices);
          pages.forEach((p) => newPdf.addPage(p));
          const bytes = await newPdf.save();
          downloadBytes(new Uint8Array(bytes), `split_pages_${startIdx + 1}-${endIdx + 1}.pdf`);
        }
        toast.success(`Split into ${chunkCount} chunk(s) of up to ${chunkSize} page(s)!`);
      }
    } catch (err) {
      toast.error('Failed to split PDF.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const modeButton = (mode: SplitMode, label: string) => (
    <button
      onClick={() => setSplitMode(mode)}
      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
        splitMode === mode
          ? 'bg-vault-amber text-vault-bg border-vault-amber'
          : 'bg-vault-hover text-vault-muted border-vault-border hover:border-vault-amber/50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center">
            <Scissors className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Split PDF</h2>
            <p className="text-sm text-vault-muted">Extract pages or split into individual files.</p>
          </div>
        </div>
        <FileUploadZone
          accept="application/pdf"
          files={files}
          onFilesChange={handleFileChange}
          label="Drop a PDF file here or click to browse"
          hint="Single PDF file only"
        />
        {pageCount !== null && (
          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-vault-hover border border-vault-border">
            <FileText className="w-4 h-4 text-vault-amber" />
            <span className="text-sm text-foreground font-medium">{pageCount} pages detected</span>
          </div>
        )}
      </div>

      {files.length > 0 && pageCount !== null && (
        <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border space-y-4">
          <h3 className="font-semibold text-foreground">Split Options</h3>

          {/* Mode selector — 2×2 grid on small screens, single row on wider */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            {modeButton('all', 'All Pages')}
            {modeButton('range', 'Page Range')}
            {modeButton('specific', 'Specific Pages')}
            {modeButton('count', 'By Page Count')}
          </div>

          {/* Page Range inputs */}
          {splitMode === 'range' && (
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1">
                <Label className="text-vault-muted text-xs">From page</Label>
                <Input
                  type="number"
                  min={1}
                  max={pageCount}
                  value={rangeStart}
                  onChange={(e) => setRangeStart(e.target.value)}
                  className="bg-vault-hover border-vault-border text-foreground"
                />
              </div>
              <span className="text-vault-muted mt-5">–</span>
              <div className="flex-1 space-y-1">
                <Label className="text-vault-muted text-xs">To page</Label>
                <Input
                  type="number"
                  min={1}
                  max={pageCount}
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(e.target.value)}
                  className="bg-vault-hover border-vault-border text-foreground"
                />
              </div>
            </div>
          )}

          {/* Specific Pages input */}
          {splitMode === 'specific' && (
            <div className="space-y-2">
              <Label className="text-vault-muted text-xs">
                Enter page numbers separated by commas (1–{pageCount})
              </Label>
              <Input
                type="text"
                placeholder="e.g. 1, 3, 5"
                value={specificPages}
                onChange={(e) => {
                  setSpecificPages(e.target.value);
                  setSpecificPagesError('');
                }}
                className="bg-vault-hover border-vault-border text-foreground"
              />
              {specificPagesError && (
                <div className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {specificPagesError}
                </div>
              )}
              <p className="text-xs text-vault-muted">
                A single PDF containing only the specified pages will be downloaded.
              </p>
            </div>
          )}

          {/* By Page Count input */}
          {splitMode === 'count' && (
            <div className="space-y-2">
              <Label className="text-vault-muted text-xs">
                Pages per split (total: {pageCount} pages)
              </Label>
              <Input
                type="number"
                min={1}
                max={pageCount - 1}
                value={pagesPerChunk}
                onChange={(e) => {
                  setPagesPerChunk(e.target.value);
                  setPagesPerChunkError('');
                }}
                className="bg-vault-hover border-vault-border text-foreground"
              />
              {pagesPerChunkError && (
                <div className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {pagesPerChunkError}
                </div>
              )}
              {!pagesPerChunkError && pagesPerChunk && parseInt(pagesPerChunk) >= 1 && parseInt(pagesPerChunk) < pageCount && (
                <p className="text-xs text-vault-muted">
                  Will create {Math.ceil(pageCount / parseInt(pagesPerChunk))} file(s) — each with up to {pagesPerChunk} page(s).
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <Button
        onClick={handleSplit}
        disabled={files.length === 0 || isProcessing}
        className="w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2"
      >
        {isProcessing ? (
          <><div className="w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" /> Splitting...</>
        ) : (
          <><Download className="w-4 h-4" /> Split & Download</>
        )}
      </Button>
    </div>
  );
}
