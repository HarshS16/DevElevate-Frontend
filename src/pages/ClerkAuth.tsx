import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ClerkAuth = () => {
  const { isSignedIn } = useAuth();

  // Redirect if already authenticated
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            DevElevate
          </h1>
          <p className="text-muted-foreground mt-2">
            Elevate your developer career
          </p>
        </div>

        <div className="border-border/50 shadow-lg rounded-lg overflow-hidden">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="p-6">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold">Welcome back</h2>
                  <p className="text-muted-foreground text-sm">
                    Sign in to your account to continue
                  </p>
                </div>
                <SignIn 
                  fallbackRedirectUrl="/dashboard"
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                      card: "shadow-none border-none bg-transparent",
                    }
                  }}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="p-6">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold">Create account</h2>
                  <p className="text-muted-foreground text-sm">
                    Get started with your developer journey
                  </p>
                </div>
                <SignUp 
                  fallbackRedirectUrl="/dashboard"
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                      card: "shadow-none border-none bg-transparent",
                    }
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClerkAuth;