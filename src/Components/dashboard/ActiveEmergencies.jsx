import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function ActiveEmergencies({ emergencies = [] }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Active Emergencies
        </h3>
      </CardHeader>
      <CardContent>
        {emergencies.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No active emergencies</p>
        ) : (
          <div className="space-y-3">
            {emergencies.slice(0, 5).map((emergency, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-medium">{emergency.title || "Emergency Alert"}</p>
                <p className="text-sm text-gray-600">{emergency.location || "Unknown location"}</p>
                <p className="text-xs text-gray-500">{emergency.created_date || "Recent"}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
