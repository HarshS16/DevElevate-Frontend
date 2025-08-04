import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
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
import { CreateResumeModal } from "@/components/modals/CreateResumeModal";
import { CreatePortfolioModal } from "@/components/modals/CreatePortfolioModal";
import { LinkedInModal } from "@/components/modals/LinkedInModal";
import { apiClient, setAuthToken } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { user } = useUser();
  const { getToken, userId } = useAuth();
  const { toast } = useToast();
  const firstName = user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Developer';

  // Modal states
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  // User data state
  const [userProfile, setUserProfile] = useState({
    resumeCount: 0,
    portfolioCount: 0,
    isGithubLinked: false,
    linkedinUrl: "",
    githubUsername: ""
  });

  // Set auth token for API client
  useEffect(() => {
    if (getToken) {
      setAuthToken(getToken);
      fetchUserProfile();
    }
  }, [getToken]);

  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.getProfile();
      const profile = response.data;
      setUserProfile({
        resumeCount: profile.resumes?.length || 0,
        portfolioCount: profile.portfolios?.length || 0,
        isGithubLinked: !!profile.githubUsername,
        linkedinUrl: profile.linkedinUrl || "",
        githubUsername: profile.githubUsername || ""
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleGithubConnect = () => {
    if (userId) {
      // Redirect to backend GitHub OAuth endpoint
      window.location.href = `https://develevate-52lh.onrender.com/api/github/auth?state=${userId}`;
    } else {
      toast({
        title: "Error",
        description: "Unable to connect to GitHub. Please try again.",
        variant: "destructive",
      });
    }
  };

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
            onClick={() => setIsResumeModalOpen(true)}
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
            onClick={() => setIsPortfolioModalOpen(true)}
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
                <div className="text-2xl font-bold">{userProfile.resumeCount}</div>
                <p className="text-sm text-muted-foreground">
                  You have {userProfile.resumeCount} resume{userProfile.resumeCount > 1 ? 's' : ''}.
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
                <div className="text-2xl font-bold">{userProfile.portfolioCount}</div>
                <p className="text-sm text-muted-foreground">
                  You have {userProfile.portfolioCount} portfolio{userProfile.portfolioCount !== 1 ? 's' : ''}.
                </p>
                <p className="text-xs text-muted-foreground">
                  Published: {userProfile.portfolioCount}
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
              {userProfile.isGithubLinked ? (
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
                {userProfile.isGithubLinked ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Username: {userProfile.githubUsername}
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
                    <Button variant="default" size="sm" className="w-full" onClick={handleGithubConnect}>
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
              {userProfile.linkedinUrl ? (
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
                {userProfile.linkedinUrl ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Profile URL added
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsLinkedInModalOpen(true)}>
                        Edit LinkedIn
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => window.open(userProfile.linkedinUrl, '_blank')}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Add your LinkedIn profile URL
                    </p>
                    <Button variant="default" size="sm" className="w-full" onClick={() => setIsLinkedInModalOpen(true)}>
                      Add LinkedIn Profile
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <CreateResumeModal 
        open={isResumeModalOpen} 
        onOpenChange={setIsResumeModalOpen}
        onSuccess={fetchUserProfile}
      />
      <CreatePortfolioModal 
        open={isPortfolioModalOpen} 
        onOpenChange={setIsPortfolioModalOpen}
        onSuccess={fetchUserProfile}
      />
      <LinkedInModal 
        open={isLinkedInModalOpen} 
        onOpenChange={setIsLinkedInModalOpen}
        currentUrl={userProfile.linkedinUrl}
        onSuccess={fetchUserProfile}
      />
    </div>
  );
}