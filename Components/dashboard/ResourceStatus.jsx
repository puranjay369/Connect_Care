import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";

export default function ResourceStatus({ isLoading }) {
  const resourceTypes = [
    { name: "Medical Supplies", available: 85, total: 100, color: "bg-red-500" },
    { name: "Food & Water", available: 92, total: 120, color: "bg-blue-500" },
    { name: "Shelter Materials", available: 45, total: 80, color: "bg-green-500" },
    { name: "Transportation", available: 12, total: 25, color: "bg-purple-500" }
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Resource Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Resource Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resourceTypes.map((resource) => {
          const percentage = Math.round((resource.available / resource.total) * 100);
          return (
            <div key={resource.name} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">{resource.name}</span>
                <span className="text-slate-600">
                  {resource.available}/{resource.total}
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="text-xs text-slate-500 text-right">
                {percentage}% available
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}