import { usePdfWorker } from "@/hooks/usePdfWorker";
import { FileCheck, Loader2, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ensurePdfLibLoaded, getPDFLib } from "../../lib/pdfUtils";

export default function FlattenPDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { processInWorker } = usePdfWorker();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleFlatten = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const fileBuffer = await file.arrayBuffer();
      let out: Uint8Array;

      try {
        out = await processInWorker("flatten", { fileBuffer });
      } catch {
        // Fallback to inline
        await ensurePdfLibLoaded();
        const { PDFDocument } = getPDFLib();
        const bytes = new Uint8Array(fileBuffer);
        const pdfDoc = await PDFDocument.load(
          bytes as unknown as Uint8Array,
          { ignoreEncryption: true } as Record<string, unknown>,
        );
        const doc = pdfDoc as unknown as Record<
          string,
          () => {
            getFields: () => Array<{ enableReadOnly: () => void }>;
            flatten: () => void;
          }
        >;
        if (typeof doc.getForm === "function") {
          const form = doc.getForm();
          const fields = form.getFields();
          for (const field of fields) {
            field.enableReadOnly();
          }
          form.flatten();
        }
        out = new Uint8Array(await pdfDoc.save());
      }

      const blob = new Blob([out.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_flattened.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: drag-and-drop zone with hidden file input */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        data-ocid="flatten.dropzone"
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
            : "border-gray-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-[#111]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]">
          <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        {file ? (
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-white/40 mt-1">
              {(file.size / 1024).toFixed(1)} KB · Click to replace
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 dark:text-white/80">
              Drop your PDF here
            </p>
            <p className="text-xs text-gray-400 dark:text-white/40 mt-1">
              or click to browse
            </p>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
        <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
          Flattening converts all interactive form fields (text boxes,
          checkboxes, dropdowns) into static, non-editable content. The visual
          appearance is preserved.
        </p>
      </div>

      <button
        type="button"
        onClick={handleFlatten}
        disabled={!file || isProcessing}
        data-ocid="flatten.submit_button"
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Processing...
          </>
        ) : (
          "Flatten PDF Forms"
        )}
      </button>
    </div>
  );
}
