import React from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Zap } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:z-40">
      <div className="flex flex-col flex-1 min-h-0 bg-background border-r">
        {/* Navigation */}
        <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
          <nav className="px-4 space-y-1">
            <Navigation />
          </nav>
          
          {/* Upgrade Card */}
          <div className="mt-8 px-4">
            <Card className="card-elegant">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Crown className="h-4 w-4 mr-2 text-accent" />
                  Upgrade to Pro
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    Get unlimited AI refinements and premium templates
                  </div>
                  <Progress value={33} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    2 of 5 free refinements used
                  </div>
                  <Button variant="accent" size="sm" className="w-full accent-glow">
                    <Zap className="h-4 w-4 mr-1" />
                    Upgrade Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-4 px-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Resume Score</span>
                <Badge variant="secondary">82/100</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Portfolio Views</span>
                <Badge variant="secondary">245</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}