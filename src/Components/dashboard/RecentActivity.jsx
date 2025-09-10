import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Activity } from "lucide-react";

export default function RecentActivity({ activities = [] }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Recent Activity
        </h3>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {activities.slice(0, 5).map((activity, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium">{activity.title || "Activity"}</p>
                <p className="text-sm text-gray-600">{activity.description || "Recent update"}</p>
                <p className="text-xs text-gray-500">{activity.timestamp || "Just now"}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
