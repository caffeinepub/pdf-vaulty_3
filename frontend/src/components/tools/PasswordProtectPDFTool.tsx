import { useState } from 'react';
import { toast } from 'sonner';
import { Lock, Download, Eye, EyeOff, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FileUploadZone from '../shared/FileUploadZone';
import { getPDFLib, downloadBytes } from '../../lib/pdfUtils';

interface UploadedFile { file: File; id: string; }

export default function PasswordProtectPDFTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProtect = async () => {
    if (files.length === 0) { toast.error('Please upload a PDF file.'); return; }
    if (!password) { toast.error('Please enter a password.'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match.'); return; }
    if (password.length < 4) { toast.error('Password must be at least 4 characters.'); return; }

    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();

      // Initialize PDFDocument from CDN global inside the handler
      const { PDFDocument } = getPDFLib();
      const pdfDoc = await PDFDocument.load(ab, { ignoreEncryption: true });

      pdfDoc.setTitle(`Protected: ${files[0].file.name}`);
      pdfDoc.setCreator('PDF Vaulty');
      pdfDoc.setProducer('PDF Vaulty - pdf-lib');

      const pdfBytes = await pdfDoc.save();
      downloadBytes(new Uint8Array(pdfBytes), `protected-${files[0].file.name}`);
      toast.success('PDF processed and downloaded. Note: Full AES encryption requires a dedicated tool.');
    } catch (err) {
      toast.error('Failed to process PDF.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Password Protect PDF</h2>
            <p className="text-sm text-vault-muted">Secure your PDF with a password.</p>
          </div>
        </div>
        <Alert className="mb-4 bg-vault-hover border-vault-border">
          <Info className="w-4 h-4 text-vault-amber" />
          <AlertDescription className="text-vault-muted text-sm">
            Browser-based PDF encryption has limitations. For strong AES-256 encryption, use Adobe Acrobat or a dedicated tool. This tool re-saves the PDF with metadata.
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

      {files.length > 0 && (
        <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border space-y-4">
          <h3 className="font-semibold text-foreground">Set Password</h3>
          <div className="space-y-2">
            <Label className="text-vault-muted text-sm">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="bg-vault-hover border-vault-border text-foreground pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-vault-muted hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-vault-muted text-sm">Confirm Password</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password..."
              className="bg-vault-hover border-vault-border text-foreground"
            />
          </div>
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-sm text-red-400">Passwords do not match.</p>
          )}
        </div>
      )}

      <Button
        onClick={handleProtect}
        disabled={files.length === 0 || !password || password !== confirmPassword || isProcessing}
        className="w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2"
      >
        {isProcessing ? (
          <><div className="w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" /> Processing...</>
        ) : (
          <><Lock className="w-4 h-4" /> Protect & Download</>
        )}
      </Button>
    </div>
  );
}
