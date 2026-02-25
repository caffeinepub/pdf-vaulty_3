import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { FileText } from 'lucide-react';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    saveProfile({ name: name.trim() });
  };

  return (
    <Dialog open={true}>
      <DialogContent className="bg-vault-surface border-vault-border sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-vault-amber flex items-center justify-center">
              <FileText className="w-5 h-5 text-vault-bg" />
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">Welcome to PDF Vaulty!</DialogTitle>
          </div>
          <DialogDescription className="text-vault-muted">
            Please enter your name to set up your profile and get started.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="bg-vault-hover border-vault-border text-foreground placeholder:text-vault-muted focus:border-vault-amber"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            disabled={!name.trim() || isPending}
            className="w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold"
          >
            {isPending ? 'Saving...' : 'Get Started'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
