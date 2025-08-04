import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText } from "lucide-react";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface CreateResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateResumeModal({ open, onOpenChange, onSuccess }: CreateResumeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("build");
  const { toast } = useToast();

  // Form data for building resume
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedinUrl: "",
      githubUrl: "",
    },
    summary: "",
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", duration: "", gpa: "" }],
    skills: "",
    projects: [{ name: "", technologies: "", description: "", githubUrl: "" }],
  });

  const handleInputChange = (section: string, field: string, value: string, index?: number) => {
    setFormData(prev => {
      if (index !== undefined && Array.isArray(prev[section as keyof typeof prev])) {
        return {
          ...prev,
          [section]: (prev[section as keyof typeof prev] as any[]).map((item: any, i: number) => 
            i === index ? { ...item, [field]: value } : item
          )
        };
      } else if (section === "personalInfo") {
        return {
          ...prev,
          personalInfo: { ...prev.personalInfo, [field]: value }
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const addArrayItem = (section: string) => {
    const defaultItems = {
      experience: { company: "", position: "", duration: "", description: "" },
      education: { institution: "", degree: "", duration: "", gpa: "" },
      projects: { name: "", technologies: "", description: "", githubUrl: "" }
    };

    setFormData(prev => ({
      ...prev,
      [section]: [...(prev[section as keyof typeof prev] as any[]), defaultItems[section as keyof typeof defaultItems]]
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      await apiClient.uploadResume(file);
      toast({
        title: "Success",
        description: "Resume uploaded successfully!",
      });
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuildResume = async () => {
    setIsLoading(true);
    try {
      await apiClient.createResume(formData);
      toast({
        title: "Success",
        description: "Resume created successfully!",
      });
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload Resume
            </TabsTrigger>
            <TabsTrigger value="build">
              <FileText className="h-4 w-4 mr-2" />
              Build from Scratch
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <Label htmlFor="resume-upload" className="cursor-pointer">
                <span className="text-lg font-medium">Upload your resume</span>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports PDF, DOC, and DOCX files
                </p>
              </Label>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isLoading}
              />
            </div>
          </TabsContent>

          <TabsContent value="build" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Professional Summary</Label>
                <Textarea
                  value={formData.summary}
                  onChange={(e) => handleInputChange("", "summary", e.target.value)}
                  placeholder="Brief professional summary..."
                />
              </div>

              <div>
                <Label>Skills (comma-separated)</Label>
                <Input
                  value={formData.skills}
                  onChange={(e) => handleInputChange("", "skills", e.target.value)}
                  placeholder="JavaScript, React, Node.js..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleBuildResume} disabled={isLoading} className="flex-1">
                {isLoading ? "Creating..." : "Create Resume"}
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}