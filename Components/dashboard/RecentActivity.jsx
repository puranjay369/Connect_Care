import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Users, Package, Shield } from "lucide-react";

export default function RecentActivity({ isLoading }) {
  const activities = [
    {
      id: 1,
      type: "emergency",
      message: "New emergency reported in Downtown Area",
      time: "2 minutes ago",
      icon: Clock,
      color: "text-red-500"
    },
    {
      id: 2,
      type: "volunteer",
      message: "15 new volunteers registered",
      time: "10 minutes ago",
      icon: Users,
      color: "text-blue-500"
    },
    {
      id: 3,
      type: "resource",
      message: "Medical supplies delivered to Central Hospital",
      time: "25 minutes ago",
      icon: Package,
      color: "text-green-500"
    },
    {
      id: 4,
      type: "ngo",
      message: "RedCross NGO updated their capabilities",
      time: "1 hour ago",
      icon: Shield,
      color: "text-purple-500"
    }
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-slate-100">
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 line-clamp-2">
                {activity.message}
              </p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}