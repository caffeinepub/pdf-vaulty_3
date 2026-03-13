import { Loader2, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ensurePdfLibLoaded, getPDFLib } from "../../lib/pdfUtils";

export default function CropPDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [margins, setMargins] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCrop = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      await ensurePdfLibLoaded();
      const { PDFDocument } = getPDFLib();
      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdfDoc = await PDFDocument.load(bytes as unknown as Uint8Array);
      const pages = pdfDoc.getPages();
      const mmToPt = (mm: number) => mm * 2.83465;
      for (const page of pages) {
        const { width, height } = page.getSize();
        const top = mmToPt(margins.top);
        const right = mmToPt(margins.right);
        const bottom = mmToPt(margins.bottom);
        const left = mmToPt(margins.left);
        const newX = left;
        const newY = bottom;
        const newWidth = Math.max(1, width - left - right);
        const newHeight = Math.max(1, height - top - bottom);
        // pdf-lib runtime methods not in stripped type declarations
        const p = page as unknown as Record<
          string,
          (a: number, b: number, c: number, d: number) => void
        >;
        if (typeof p.setMediaBox === "function")
          p.setMediaBox(newX, newY, newWidth, newHeight);
        if (typeof p.setCropBox === "function")
          p.setCropBox(newX, newY, newWidth, newHeight);
      }
      const out = await pdfDoc.save();
      const blob = new Blob([out.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_cropped.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const MarginInput = ({
    label,
    field,
  }: { label: string; field: keyof typeof margins }) => {
    const id = `crop-margin-${field}`;
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="text-xs font-medium text-gray-500 dark:text-white/50"
        >
          {label} (mm)
        </label>
        <input
          id={id}
          type="number"
          min="0"
          max="200"
          value={margins[field]}
          onChange={(e) =>
            setMargins((prev) => ({ ...prev, [field]: Number(e.target.value) }))
          }
          data-ocid={`crop.${field}.input`}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    );
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
        data-ocid="crop.dropzone"
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

      <div className="grid grid-cols-2 gap-4">
        <MarginInput label="Top" field="top" />
        <MarginInput label="Right" field="right" />
        <MarginInput label="Bottom" field="bottom" />
        <MarginInput label="Left" field="left" />
      </div>

      <button
        type="button"
        onClick={handleCrop}
        disabled={!file || isProcessing}
        data-ocid="crop.submit_button"
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Processing...
          </>
        ) : (
          "Crop & Download PDF"
        )}
      </button>
    </div>
  );
}
