import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Package } from "lucide-react";

export default function ResourceStatus({ resources = [] }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'reserved': return 'text-blue-600 bg-blue-100';
      case 'deployed': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Package className="w-5 h-5 text-green-500" />
          Resource Status
        </h3>
      </CardHeader>
      <CardContent>
        {resources.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No resources tracked</p>
        ) : (
          <div className="space-y-3">
            {resources.slice(0, 5).map((resource, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{resource.name || "Resource"}</p>
                  <p className="text-sm text-gray-600">{resource.quantity || 0} units</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resource.availability)}`}>
                  {resource.availability || 'unknown'}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
