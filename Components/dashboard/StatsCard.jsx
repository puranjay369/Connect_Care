import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

const colorClasses = {
  red: {
    bg: "bg-red-500",
    text: "text-red-600",
    bgLight: "bg-red-50"
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-600",
    bgLight: "bg-blue-50"
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-600",
    bgLight: "bg-green-50"
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-purple-600",
    bgLight: "bg-purple-50"
  }
};

export default function StatsCard({ title, value, icon: Icon, trend, color, isLoading }) {
  const colors = colorClasses[color] || colorClasses.blue;

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-20 mt-4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.bgLight} rounded-full -translate-y-8 translate-x-8 opacity-50`} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          </div>
          <div className={`p-3 ${colors.bgLight} rounded-lg`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
        </div>
        {trend && (
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-slate-600">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}