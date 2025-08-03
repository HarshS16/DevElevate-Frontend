import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Briefcase, 
  Plus,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  const firstName = user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Developer';

  // Mock data - replace with actual API calls
  const resumeCount = 2;
  const portfolioCount = 1;
  const isGithubLinked = false;
  const linkedinUrl = "";

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Actions Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome, {firstName}!</h1>
          <p className="text-muted-foreground text-lg">
            Let's refine your developer presence.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Button 
            size="lg" 
            variant="gradient" 
            className="h-20 text-lg justify-start p-6"
          >
            <Plus className="h-6 w-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Create New Resume</div>
              <div className="text-sm opacity-90">Build your perfect resume</div>
            </div>
          </Button>
          
          <Button 
            size="lg" 
            variant="accent" 
            className="h-20 text-lg justify-start p-6"
          >
            <Briefcase className="h-6 w-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Generate New Portfolio</div>
              <div className="text-sm opacity-90">Showcase your projects</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Your Content Overview Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Creations</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Resumes</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold">{resumeCount}</div>
                <p className="text-sm text-muted-foreground">
                  You have {resumeCount} resume{resumeCount > 1 ? 's' : ''}.
                </p>
                <p className="text-xs text-muted-foreground">
                  Last updated: 2 days ago
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View All Resumes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Portfolios</CardTitle>
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold">{portfolioCount}</div>
                <p className="text-sm text-muted-foreground">
                  You have {portfolioCount} portfolio{portfolioCount !== 1 ? 's' : ''}.
                </p>
                <p className="text-xs text-muted-foreground">
                  Published: {portfolioCount}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View All Portfolios
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Integrations & Profile Status Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Integrations & Profile</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </CardTitle>
              {isGithubLinked ? (
                <Badge variant="default" className="bg-success text-success-foreground">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Linked
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Not Linked
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {isGithubLinked ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Username: your-username
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Manage GitHub
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Connect your GitHub to showcase your repositories
                    </p>
                    <Button variant="default" size="sm" className="w-full">
                      Connect GitHub
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </CardTitle>
              {linkedinUrl ? (
                <Badge variant="default" className="bg-success text-success-foreground">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Added
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Not Added
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {linkedinUrl ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Profile URL added
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit LinkedIn
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Add your LinkedIn profile URL
                    </p>
                    <Button variant="default" size="sm" className="w-full">
                      Add LinkedIn Profile
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}