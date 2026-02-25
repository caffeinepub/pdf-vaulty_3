import { useState } from 'react';
import { toast } from 'sonner';
import { FileText, Download, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FileUploadZone from '../shared/FileUploadZone';
import { getJsPDF } from '../../lib/pdfUtils';

interface UploadedFile { file: File; id: string; }

export default function WordToPDFTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (files.length === 0) { toast.error('Please upload a .docx file.'); return; }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      const text = await extractTextFromDocx(ab);

      // Initialize jsPDF from CDN global inside the handler
      const JsPDF = getJsPDF();
      const doc = new JsPDF({ unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      const lineHeight = 7;
      let y = margin;

      // Add title
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const title = files[0].file.name.replace(/\.(docx|doc)$/i, '');
      doc.text(title, margin, y);
      y += lineHeight * 2;

      // Add content
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');

      const paragraphs = text.split('\n').filter((p: string) => p.trim());
      for (const para of paragraphs) {
        const lines = doc.splitTextToSize(para, maxWidth);
        for (const line of lines) {
          if (y > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += lineHeight;
        }
        y += lineHeight * 0.5;
      }

      doc.save(files[0].file.name.replace(/\.(docx|doc)$/i, '.pdf'));
      toast.success('Word document converted to PDF!');
    } catch (err) {
      toast.error('Failed to convert Word to PDF.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-400/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Word to PDF</h2>
            <p className="text-sm text-vault-muted">Convert .docx files to PDF format.</p>
          </div>
        </div>
        <Alert className="mb-4 bg-vault-hover border-vault-border">
          <Info className="w-4 h-4 text-vault-amber" />
          <AlertDescription className="text-vault-muted text-sm">
            Text content is extracted and formatted into a PDF. Complex formatting, images, and tables may not be fully preserved.
          </AlertDescription>
        </Alert>
        <FileUploadZone
          accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          files={files}
          onFilesChange={setFiles}
          label="Drop a .docx file here or click to browse"
          hint="Supports .docx and .doc files"
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

/**
 * Extracts text from a .docx file by parsing its ZIP/XML structure
 * using browser-native APIs only (no external dependencies).
 */
async function extractTextFromDocx(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const uint8 = new Uint8Array(arrayBuffer);
    const xmlContent = extractFileFromZip(uint8, 'word/document.xml');
    if (!xmlContent) {
      return 'Could not read document content. Please ensure this is a valid .docx file.';
    }

    const text = xmlContent
      .replace(/<w:br[^>]*\/>/g, '\n')
      .replace(/<\/w:p>/g, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return text || 'No text content found in this document.';
  } catch {
    return 'Could not parse this document format.';
  }
}

function extractFileFromZip(data: Uint8Array, targetPath: string): string | null {
  try {
    let offset = 0;
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);

    while (offset < data.length - 4) {
      const signature = view.getUint32(offset, true);
      if (signature !== 0x04034b50) {
        offset++;
        continue;
      }

      const compressionMethod = view.getUint16(offset + 8, true);
      const compressedSize = view.getUint32(offset + 18, true);
      const fileNameLength = view.getUint16(offset + 26, true);
      const extraFieldLength = view.getUint16(offset + 28, true);

      const fileNameBytes = data.slice(offset + 30, offset + 30 + fileNameLength);
      const fileName = new TextDecoder('utf-8').decode(fileNameBytes);

      const dataOffset = offset + 30 + fileNameLength + extraFieldLength;
      const compressedData = data.slice(dataOffset, dataOffset + compressedSize);

      if (fileName === targetPath) {
        if (compressionMethod === 0) {
          return new TextDecoder('utf-8').decode(compressedData);
        } else if (compressionMethod === 8) {
          return decompressDeflate(compressedData);
        }
        return null;
      }

      offset = dataOffset + compressedSize;
    }
    return null;
  } catch {
    return null;
  }
}

function decompressDeflate(compressed: Uint8Array): string | null {
  try {
    const raw = new TextDecoder('latin1').decode(compressed);
    const xmlStart = raw.indexOf('<?xml');
    const xmlAlt = raw.indexOf('<w:document');
    const start = xmlStart >= 0 ? xmlStart : xmlAlt >= 0 ? xmlAlt : -1;
    if (start >= 0) return raw.substring(start);
    return raw;
  } catch {
    return null;
  }
}
