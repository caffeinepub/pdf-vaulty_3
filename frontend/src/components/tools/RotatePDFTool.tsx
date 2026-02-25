import { useState } from 'react';
import { toast } from 'sonner';
import { RotateCw, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileUploadZone from '../shared/FileUploadZone';
import { getPDFLib, downloadBytes } from '../../lib/pdfUtils';

interface UploadedFile { file: File; id: string; }

const ROTATION_OPTIONS = [
  { label: '90° Clockwise', value: 90 },
  { label: '180°', value: 180 },
  { label: '270° Clockwise', value: 270 },
];

export default function RotatePDFTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [rotation, setRotation] = useState(90);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (newFiles: UploadedFile[]) => {
    setFiles(newFiles);
    setPageCount(null);
    if (newFiles.length > 0) {
      try {
        const ab = await newFiles[0].file.arrayBuffer();
        const { PDFDocument } = getPDFLib();
        const pdf = await PDFDocument.load(ab);
        setPageCount(pdf.getPageCount());
      } catch {
        toast.error('Could not read PDF.');
      }
    }
  };

  const handleRotate = async () => {
    if (files.length === 0) { toast.error('Please upload a PDF file.'); return; }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      // Initialize PDFDocument and degrees from CDN global inside the handler
      const { PDFDocument, degrees } = getPDFLib();
      const pdfDoc = await PDFDocument.load(ab);
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const currentRotation = page.getRotation().angle;
        const newRotation = (currentRotation + rotation) % 360;
        page.setRotation(degrees(newRotation));
      }

      const rotatedBytes = await pdfDoc.save();
      downloadBytes(new Uint8Array(rotatedBytes), `rotated-${files[0].file.name}`);
      toast.success('PDF rotated successfully!');
    } catch (err) {
      toast.error('Failed to rotate PDF.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center">
            <RotateCw className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Rotate PDF</h2>
            <p className="text-sm text-vault-muted">Rotate all pages by a chosen angle.</p>
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

      {files.length > 0 && (
        <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border space-y-4">
          <h3 className="font-semibold text-foreground">Rotation Angle</h3>
          <div className="flex gap-3">
            {ROTATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRotation(opt.value)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-colors flex flex-col items-center gap-1 ${
                  rotation === opt.value
                    ? 'bg-vault-amber text-vault-bg border-vault-amber'
                    : 'bg-vault-hover text-vault-muted border-vault-border hover:border-vault-amber/50'
                }`}
              >
                <RotateCw
                  className={`w-4 h-4 ${rotation === opt.value ? '' : 'text-vault-muted'}`}
                  style={{ transform: `rotate(${opt.value}deg)` }}
                />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleRotate}
        disabled={files.length === 0 || isProcessing}
        className="w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2"
      >
        {isProcessing ? (
          <><div className="w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" /> Rotating...</>
        ) : (
          <><Download className="w-4 h-4" /> Rotate & Download</>
        )}
      </Button>
    </div>
  );
}
