import { useState } from 'react';
import { toast } from 'sonner';
import { FileType, Download, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FileUploadZone from '../shared/FileUploadZone';
import { downloadBlob } from '../../lib/pdfUtils';

interface UploadedFile { file: File; id: string; }

export default function PDFToWordTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (files.length === 0) { toast.error('Please upload a PDF file.'); return; }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      const bytes = new Uint8Array(ab);
      const text = extractTextFromPDF(bytes);

      const rtfContent = generateRTF(text, files[0].file.name);
      const blob = new Blob([rtfContent], { type: 'application/rtf' });
      downloadBlob(blob, files[0].file.name.replace('.pdf', '.rtf'));
      toast.success('PDF converted to Word-compatible format!');
    } catch (err) {
      toast.error('Failed to convert PDF to Word.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center">
            <FileType className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">PDF to Word</h2>
            <p className="text-sm text-vault-muted">Convert PDF to an editable Word-compatible document.</p>
          </div>
        </div>
        <Alert className="mb-4 bg-vault-hover border-vault-border">
          <Info className="w-4 h-4 text-vault-amber" />
          <AlertDescription className="text-vault-muted text-sm">
            Client-side conversion extracts text content. Complex layouts and images may not be preserved. Output is in RTF format, openable in Microsoft Word and LibreOffice.
          </AlertDescription>
        </Alert>
        <FileUploadZone
          accept="application/pdf"
          files={files}
          onFilesChange={setFiles}
          label="Drop a PDF file here or click to browse"
          hint="Single PDF file only"
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

function extractTextFromPDF(bytes: Uint8Array): string {
  try {
    const str = new TextDecoder('latin1').decode(bytes);
    const textParts: string[] = [];
    const btEtRegex = /BT([\s\S]*?)ET/g;
    let match;
    while ((match = btEtRegex.exec(str)) !== null) {
      const block = match[1];
      const strRegex = /\(([^)]*)\)/g;
      let strMatch;
      while ((strMatch = strRegex.exec(block)) !== null) {
        const decoded = strMatch[1]
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\t/g, '\t')
          .replace(/\\\\/g, '\\')
          .replace(/\\\(/g, '(')
          .replace(/\\\)/g, ')');
        if (decoded.trim()) textParts.push(decoded);
      }
    }
    return textParts.join(' ') || 'No extractable text found in this PDF.';
  } catch {
    return 'Could not extract text from this PDF.';
  }
}

function generateRTF(text: string, filename: string): string {
  const escaped = text
    .replace(/\\/g, '\\\\')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\n/g, '\\par\n');

  return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}}
{\\info{\\title ${filename}}}
\\f0\\fs24
${escaped}
}`;
}
