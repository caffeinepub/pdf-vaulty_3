import { useState } from 'react';
import { toast } from 'sonner';
import { FileSpreadsheet, Download, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FileUploadZone from '../shared/FileUploadZone';
import { getJsPDF, getXLSX } from '../../lib/pdfUtils';

interface UploadedFile { file: File; id: string; }

export default function ExcelToPDFTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (files.length === 0) { toast.error('Please upload an Excel file.'); return; }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();

      // Get XLSX and jsPDF from CDN globals inside the handler
      const XLSX = getXLSX();
      const workbook = XLSX.read(ab, { type: 'array' });

      const JsPDF = getJsPDF();
      const doc = new JsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      let isFirstSheet = true;

      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, defval: '' });

        if (data.length === 0) continue;

        if (!isFirstSheet) doc.addPage();
        isFirstSheet = false;

        let y = margin + 8;

        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`Sheet: ${sheetName}`, margin, y);
        y += 8;

        const headers = (data[0] || []).map(String);
        const rows = data.slice(1).map((row: string[]) => row.map(String));
        const colCount = Math.max(headers.length, 1);
        const colWidth = Math.min(40, (pageWidth - margin * 2) / colCount);

        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setFillColor(245, 158, 11);
        doc.rect(margin, y - 4, pageWidth - margin * 2, 7, 'F');
        doc.setTextColor(30, 30, 30);
        headers.forEach((h: string, i: number) => {
          const x = margin + i * colWidth;
          if (x + colWidth <= pageWidth - margin) {
            doc.text(String(h).substring(0, 15), x + 1, y);
          }
        });
        doc.setTextColor(220, 220, 220);
        y += 7;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        rows.forEach((row: string[], rowIdx: number) => {
          if (y > pageHeight - margin) {
            doc.addPage();
            y = margin + 8;
          }
          if (rowIdx % 2 === 0) {
            doc.setFillColor(40, 40, 45);
            doc.rect(margin, y - 4, pageWidth - margin * 2, 6, 'F');
          }
          row.forEach((cell: string, i: number) => {
            const x = margin + i * colWidth;
            if (x + colWidth <= pageWidth - margin) {
              doc.text(String(cell).substring(0, 18), x + 1, y);
            }
          });
          y += 6;
        });
      }

      doc.save(files[0].file.name.replace(/\.(xlsx|xls)$/i, '.pdf'));
      toast.success('Excel converted to PDF!');
    } catch (err) {
      toast.error('Failed to convert Excel to PDF. Please ensure the file is a valid Excel spreadsheet.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Excel to PDF</h2>
            <p className="text-sm text-vault-muted">Convert Excel spreadsheets to PDF format.</p>
          </div>
        </div>
        <Alert className="mb-4 bg-vault-hover border-vault-border">
          <Info className="w-4 h-4 text-vault-amber" />
          <AlertDescription className="text-vault-muted text-sm">
            Spreadsheet data is rendered as a table in the PDF. Charts and complex formatting may not be preserved.
          </AlertDescription>
        </Alert>
        <FileUploadZone
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          files={files}
          onFilesChange={setFiles}
          label="Drop an Excel file here or click to browse"
          hint="Supports .xlsx and .xls files"
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
