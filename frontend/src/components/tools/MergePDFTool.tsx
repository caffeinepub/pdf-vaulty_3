import { useState } from 'react';
import { toast } from 'sonner';
import { Merge, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileUploadZone from '../shared/FileUploadZone';
import { getPDFLib, downloadBytes } from '../../lib/pdfUtils';

interface UploadedFile { file: File; id: string; }

export default function MergePDFTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please upload at least 2 PDF files to merge.');
      return;
    }
    setIsProcessing(true);
    try {
      // Initialize PDFDocument from CDN global inside the handler
      const { PDFDocument } = getPDFLib();
      const mergedPdf = await PDFDocument.create();

      for (const { file } of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      downloadBytes(new Uint8Array(mergedBytes), 'merged.pdf');
      toast.success('PDFs merged successfully!');
    } catch (err) {
      toast.error('Failed to merge PDFs. Please ensure all files are valid PDFs.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
            <Merge className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Merge PDF Files</h2>
            <p className="text-sm text-vault-muted">Combine multiple PDFs into one. Drag to reorder.</p>
          </div>
        </div>
        <FileUploadZone
          accept="application/pdf"
          multiple
          files={files}
          onFilesChange={setFiles}
          label="Drop PDF files here or click to browse"
          hint="Supports multiple PDF files • Drag to reorder"
        />
      </div>

      <Button
        onClick={handleMerge}
        disabled={files.length < 2 || isProcessing}
        className="w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2"
      >
        {isProcessing ? (
          <><div className="w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" /> Merging...</>
        ) : (
          <><Download className="w-4 h-4" /> Merge & Download</>
        )}
      </Button>
    </div>
  );
}
