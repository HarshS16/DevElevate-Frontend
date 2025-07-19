import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  icon: LucideIcon;
  status: "completed" | "in-progress" | "not-started";
  progress?: number;
  description: string;
  actionText: string;
  className?: string;
  onAction?: () => void;
}

export function StatusCard({
  title,
  icon: Icon,
  status,
  progress = 0,
  description,
  actionText,
  className,
  onAction,
}: StatusCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-success text-success-foreground">Completed</Badge>;
      case "in-progress":
        return <Badge variant="default" className="bg-warning text-warning-foreground">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Not Started</Badge>;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "text-success";
      case "in-progress":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("card-elegant", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium flex items-center">
          <Icon className={cn("h-4 w-4 mr-2", getStatusColor())} />
          {title}
        </CardTitle>
        {getStatusBadge()}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{description}</p>
          
          {status === "in-progress" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <Button 
            variant={status === "completed" ? "outline" : "accent"}
            size="sm" 
            className="w-full"
            onClick={onAction}
          >
            {actionText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}