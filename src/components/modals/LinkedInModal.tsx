import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface LinkedInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUrl?: string;
  onSuccess?: () => void;
}

export function LinkedInModal({ open, onOpenChange, currentUrl = "", onSuccess }: LinkedInModalProps) {
  const [linkedinUrl, setLinkedinUrl] = useState(currentUrl);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateLinkedInUrl = (url: string) => {
    const linkedinPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedinPattern.test(url);
  };

  const handleSave = async () => {
    if (!linkedinUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter your LinkedIn profile URL.",
        variant: "destructive",
      });
      return;
    }

    if (!validateLinkedInUrl(linkedinUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/your-profile).",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.updateProfile({ linkedinUrl });
      toast({
        title: "Success",
        description: "LinkedIn profile updated successfully!",
      });
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update LinkedIn profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentUrl ? "Edit LinkedIn Profile" : "Add LinkedIn Profile"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
            <Input
              id="linkedin-url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/your-profile"
              type="url"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter your complete LinkedIn profile URL
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={handleSave} disabled={isLoading || !linkedinUrl.trim()} className="flex-1">
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}