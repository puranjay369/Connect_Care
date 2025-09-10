import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { AlertTriangle, Clock, MapPin } from "lucide-react";

export default function EmergencyCard({ emergency }) {
  if (!emergency) return null;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            {emergency.title || "Emergency Alert"}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(emergency.severity)}`}>
            {emergency.severity || 'unknown'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-gray-600">{emergency.description || "No description available"}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {emergency.location || "Unknown location"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {emergency.created_date || "Recent"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
