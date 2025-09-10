import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Users, 
  Phone, 
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";

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

export default function EmergencyCard({ emergency }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">
                {categoryIcons[emergency.category] || "📋"}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{emergency.title}</h3>
              <Badge className={severityColors[emergency.severity]}>
                {emergency.severity.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {emergency.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {format(new Date(emergency.created_date), "MMM d, yyyy h:mm a")}
              </div>
              {emergency.affected_people && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {emergency.affected_people} people affected
                </div>
              )}
            </div>
          </div>
          
          <Badge className={statusColors[emergency.status]}>
            {emergency.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {emergency.description && (
          <p className="text-slate-700 leading-relaxed">
            {emergency.description}
          </p>
        )}

        {emergency.priority_needs && emergency.priority_needs.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Priority Needs:
            </h4>
            <div className="flex flex-wrap gap-2">
              {emergency.priority_needs.map((need, index) => (
                <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {need}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {(emergency.contact_person || emergency.contact_phone) && (
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              {emergency.contact_person && (
                <p className="font-medium text-slate-800">{emergency.contact_person}</p>
              )}
              {emergency.contact_phone && (
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {emergency.contact_phone}
                </p>
              )}
            </div>
            {emergency.contact_phone && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`tel:${emergency.contact_phone}`)}
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}