import FileUploadZone from "@/components/shared/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ensurePdfLibLoaded, formatBytes, getPDFLib } from "@/lib/pdfUtils";
import {
  AlertCircle,
  CheckCircle,
  Download,
  FileEdit,
  Loader2,
} from "lucide-react";
import { useState } from "react";

interface UploadedFile {
  file: File;
  id: string;
}

interface MetadataFields {
  title: string;
  author: string;
  subject: string;
  keywords: string;
}

export default function PDFMetadataTool() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [metadata, setMetadata] = useState<MetadataFields | null>(null);
  const [outputBytes, setOutputBytes] = useState<Uint8Array | null>(null);
  const [outputName, setOutputName] = useState("");

  const handleFilesChange = async (files: UploadedFile[]) => {
    setUploadedFiles(files);
    setMetadata(null);
    setError(null);
    setSuccess(false);
    setOutputBytes(null);

    if (files.length === 0) return;

    setIsLoading(true);
    try {
      await ensurePdfLibLoaded();
      const PDFLib = getPDFLib();
      const arrayBuffer = await files[0].file.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });

      // Read existing metadata from the document info dictionary
      // pdf-lib stores metadata internally; we access via context
      // We use the setter/getter pattern — read by attempting to
      // look at the Info dictionary through the context
      let title = "";
      let author = "";
      let subject = "";
      let keywords = "";

      try {
        // Access the PDF info dictionary via context
        const context = pdfDoc.context;
        const indirectObjects = context.enumerateIndirectObjects();
        for (const [, obj] of indirectObjects) {
          // Check if it's the Info dictionary by looking for known keys
          const objStr = obj?.toString?.() ?? "";
          if (
            objStr.includes("/Title") ||
            objStr.includes("/Author") ||
            objStr.includes("/Subject") ||
            objStr.includes("/Keywords")
          ) {
            // Parse out values from the PDF dict string representation
            const extractVal = (key: string): string => {
              const regex = new RegExp(`/${key}\\s*\\(([^)]*)\\)`, "s");
              const m = objStr.match(regex);
              return m ? m[1].replace(/\\n/g, "\n").trim() : "";
            };
            title = extractVal("Title");
            author = extractVal("Author");
            subject = extractVal("Subject");
            keywords = extractVal("Keywords");
            break;
          }
        }
      } catch {
        // Could not read existing metadata — start with empty fields
      }

      setMetadata({ title, author, subject, keywords });
      setOutputName(`${files[0].file.name.replace(/\.pdf$/i, "")}_updated.pdf`);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Could not read PDF metadata.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!metadata || uploadedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      await ensurePdfLibLoaded();
      const PDFLib = getPDFLib();
      const arrayBuffer = await uploadedFiles[0].file.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });

      pdfDoc.setTitle(metadata.title);
      pdfDoc.setAuthor(metadata.author);
      pdfDoc.setSubject(metadata.subject);
      pdfDoc.setKeywords(
        metadata.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      );
      pdfDoc.setModificationDate(new Date());

      const bytes = await pdfDoc.save();
      setOutputBytes(bytes);
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to update metadata.";
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!outputBytes) return;
    const blob = new Blob([outputBytes.buffer as ArrayBuffer], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <FileUploadZone
        accept=".pdf"
        multiple={false}
        files={uploadedFiles}
        onFilesChange={handleFilesChange}
        label="Drop your PDF here or click to browse"
        hint="Supports PDF files"
      />

      {isLoading && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl bg-muted/40 border border-border"
          data-ocid="metadata.loading_state"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">
            Reading metadata...
          </span>
        </div>
      )}

      {error && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive"
          data-ocid="metadata.error_state"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {metadata && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <FileEdit className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm text-foreground">
              Edit Metadata Fields
            </h3>
            {uploadedFiles.length > 0 && (
              <span className="ml-auto text-xs text-muted-foreground">
                {formatBytes(uploadedFiles[0].file.size)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="meta-title"
                className="text-xs font-medium text-muted-foreground"
              >
                Title
              </Label>
              <Input
                id="meta-title"
                data-ocid="metadata.title.input"
                value={metadata.title}
                onChange={(e) =>
                  setMetadata((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev,
                  )
                }
                placeholder="Document title"
                className="bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="meta-author"
                className="text-xs font-medium text-muted-foreground"
              >
                Author
              </Label>
              <Input
                id="meta-author"
                data-ocid="metadata.author.input"
                value={metadata.author}
                onChange={(e) =>
                  setMetadata((prev) =>
                    prev ? { ...prev, author: e.target.value } : prev,
                  )
                }
                placeholder="Author name"
                className="bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="meta-subject"
                className="text-xs font-medium text-muted-foreground"
              >
                Subject
              </Label>
              <Input
                id="meta-subject"
                data-ocid="metadata.subject.input"
                value={metadata.subject}
                onChange={(e) =>
                  setMetadata((prev) =>
                    prev ? { ...prev, subject: e.target.value } : prev,
                  )
                }
                placeholder="Document subject"
                className="bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="meta-keywords"
                className="text-xs font-medium text-muted-foreground"
              >
                Keywords{" "}
                <span className="text-muted-foreground/60">
                  (comma-separated)
                </span>
              </Label>
              <Input
                id="meta-keywords"
                data-ocid="metadata.keywords.input"
                value={metadata.keywords}
                onChange={(e) =>
                  setMetadata((prev) =>
                    prev ? { ...prev, keywords: e.target.value } : prev,
                  )
                }
                placeholder="keyword1, keyword2, keyword3"
                className="bg-background"
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isProcessing}
            className="w-full"
            size="lg"
            data-ocid="metadata.submit_button"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving metadata...
              </>
            ) : (
              "Save Metadata"
            )}
          </Button>
        </div>
      )}

      {success && outputBytes && (
        <div
          className="rounded-xl border border-border bg-card p-5 space-y-4"
          data-ocid="metadata.success_state"
        >
          <div className="flex items-center gap-2 text-green-500 font-semibold">
            <CheckCircle className="h-5 w-5" />
            Metadata updated successfully!
          </div>
          <p className="text-sm text-muted-foreground">
            The PDF metadata has been updated. Download the file below.
          </p>
          <Button
            onClick={handleDownload}
            className="w-full gap-2"
            size="lg"
            data-ocid="metadata.download.button"
          >
            <Download className="h-4 w-4" />
            Download Updated PDF
          </Button>
        </div>
      )}
    </div>
  );
}
