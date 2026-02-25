import { useState } from 'react';
import { toast } from 'sonner';
import { Image as ImageIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileUploadZone from '../shared/FileUploadZone';
import { getJsPDF } from '../../lib/pdfUtils';

interface UploadedFile { file: File; id: string; }

export default function ImageToPDFTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.src = dataUrl;
    });
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) { toast.error('Please upload at least one image.'); return; }
    setIsProcessing(true);
    try {
      // Initialize jsPDF from CDN global inside the handler
      const JsPDF = getJsPDF();
      const doc = new JsPDF({ unit: 'px', hotfixes: ['px_scaling'] });
      let isFirstPage = true;

      for (const { file } of files) {
        const dataUrl = await readFileAsDataUrl(file);
        const { width, height } = await getImageDimensions(dataUrl);
        const format = file.type === 'image/png' ? 'PNG' : 'JPEG';

        if (!isFirstPage) {
          doc.addPage([width, height]);
        } else {
          doc.internal.pageSize.width = width;
          doc.internal.pageSize.height = height;
          isFirstPage = false;
        }

        doc.addImage(dataUrl, format, 0, 0, width, height);
      }

      doc.save('images.pdf');
      toast.success('Images converted to PDF!');
    } catch (err) {
      toast.error('Failed to convert images to PDF.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-pink-400/10 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Image to PDF</h2>
            <p className="text-sm text-vault-muted">Convert JPG and PNG images to a PDF document.</p>
          </div>
        </div>
        <FileUploadZone
          accept="image/jpeg,image/png,image/jpg"
          multiple
          files={files}
          onFilesChange={setFiles}
          label="Drop image files here or click to browse"
          hint="Supports JPG and PNG • Multiple images allowed"
        />
      </div>

      <Button
        onClick={handleConvert}
        disabled={files.length === 0 || isProcessing}
        className="w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2"
      >
        {isProcessing ? (
          <><div className="w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" /> Converting...</>
        ) : (
          <><Download className="w-4 h-4" /> Convert & Download</>
        )}
      </Button>
    </div>
  );
}
