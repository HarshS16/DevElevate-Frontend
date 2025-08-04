import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface CreatePortfolioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreatePortfolioModal({ open, onOpenChange, onSuccess }: CreatePortfolioModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    template: "modern",
    selectedProjects: [] as string[],
    customSections: {
      about: "",
      contact: "",
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreatePortfolio = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a portfolio title.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.createPortfolio({
        title: formData.title,
        description: formData.description,
        template: formData.template,
        selectedProjects: formData.selectedProjects,
        customSections: formData.customSections,
      });

      toast({
        title: "Success",
        description: "Portfolio created successfully!",
      });
      onSuccess?.();
      onOpenChange(false);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        template: "modern",
        selectedProjects: [],
        customSections: { about: "", contact: "" },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate New Portfolio</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Portfolio Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="My Developer Portfolio"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of your portfolio..."
            />
          </div>

          <div>
            <Label htmlFor="template">Template</Label>
            <Select value={formData.template} onValueChange={(value) => handleInputChange("template", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="about">About Section</Label>
            <Textarea
              id="about"
              value={formData.customSections.about}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                customSections: { ...prev.customSections, about: e.target.value }
              }))}
              placeholder="Tell visitors about yourself..."
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact Information</Label>
            <Textarea
              id="contact"
              value={formData.customSections.contact}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                customSections: { ...prev.customSections, contact: e.target.value }
              }))}
              placeholder="How can people reach you..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={handleCreatePortfolio} disabled={isLoading} className="flex-1">
            {isLoading ? "Creating..." : "Generate Portfolio"}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}