import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Users,
  Phone,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const severityColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200"
};

const statusColors = {
  active: "bg-red-100 text-red-800 border-red-200",
  responding: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
  monitoring: "bg-gray-100 text-gray-800 border-gray-200"
};

const categoryIcons = {
  natural_disaster: "🌪️",
  medical_emergency: "🏥",
  fire: "🔥",
  accident: "🚗",
  violence: "⚠️",
  infrastructure: "🏗️",
  other: "📋"
};

export default function ActiveEmergencies({ emergencies, isLoading }) {
  const activeEmergencies = emergencies.filter(e => 
    e.status === 'active' || e.status === 'responding'
  ).slice(0, 6);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Active Emergencies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Active Emergencies
        </CardTitle>
        <Link to={createPageUrl("Emergencies")}>
          <Button variant="outline" size="sm">
            View All
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeEmergencies.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No Active Emergencies</p>
            <p className="text-sm">All reported incidents are resolved or being monitored.</p>
          </div>
        ) : (
          activeEmergencies.map((emergency) => (
            <div
              key={emergency.id}
              className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {categoryIcons[emergency.category] || "📋"}
                    </span>
                    <h3 className="font-semibold text-slate-900">{emergency.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {emergency.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {format(new Date(emergency.created_date), "MMM d, h:mm a")}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={severityColors[emergency.severity]}>
                    {emergency.severity.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className={statusColors[emergency.status]}>
                  {emergency.status.replace('_', ' ').toUpperCase()}
                </Badge>
                {emergency.affected_people && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {emergency.affected_people} affected
                  </Badge>
                )}
                {emergency.contact_phone && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Contact available
                  </Badge>
                )}
              </div>

              {emergency.description && (
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                  {emergency.description}
                </p>
              )}

              {emergency.priority_needs && emergency.priority_needs.length > 0 && (
                <div className="text-sm">
                  <span className="font-medium text-slate-700">Urgent needs: </span>
                  <span className="text-slate-600">
                    {emergency.priority_needs.slice(0, 3).join(", ")}
                    {emergency.priority_needs.length > 3 && "..."}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}