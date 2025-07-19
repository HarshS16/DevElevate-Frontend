import React from "react";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Briefcase, 
  FileEdit, 
  Eye, 
  Download, 
  Target,
  TrendingUp,
  Users,
  Clock,
  Star
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, John</h1>
        <p className="text-muted-foreground">
          Track your progress and manage your developer career tools
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Resume Score"
          value="82/100"
          change="+12 from last refinement"
          changeType="positive"
          icon={Target}
        />
        <MetricsCard
          title="Portfolio Views"
          value="245"
          change="+18% this week"
          changeType="positive"
          icon={Eye}
        />
        <MetricsCard
          title="Applications"
          value="23"
          change="5 pending responses"
          changeType="neutral"
          icon={FileEdit}
        />
        <MetricsCard
          title="Profile Rating"
          value="4.8/5"
          change="Based on 12 reviews"
          changeType="positive"
          icon={Star}
        />
      </div>

      {/* Status Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatusCard
          title="Resume Status"
          icon={FileText}
          status="in-progress"
          progress={75}
          description="Your resume is 75% optimized for ATS systems. Add more quantified achievements."
          actionText="Continue Refining"
        />
        
        <StatusCard
          title="Portfolio"
          icon={Briefcase}
          status="completed"
          description="Your portfolio is live and performing well. 5 projects showcased with detailed case studies."
          actionText="View Portfolio"
        />
        
        <StatusCard
          title="Cover Letter"
          icon={FileEdit}
          status="not-started"
          description="Generate personalized cover letters for your job applications using AI."
          actionText="Create Cover Letter"
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Resume refined</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Portfolio updated</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Cover letter generated</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="accent" className="w-full justify-start accent-glow">
                <FileText className="h-4 w-4 mr-2" />
                Refine Resume with AI
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Latest Resume
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Preview Portfolio
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Connect LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}