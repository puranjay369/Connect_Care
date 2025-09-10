import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Building, MapPin, Package } from "lucide-react";

export default function ResourceCard({ resource }) {
  if (!resource) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'reserved': return 'text-blue-600 bg-blue-100';
      case 'deployed': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-green-500" />
            {resource.name || "Resource"}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resource.availability)}`}>
            {resource.availability || 'unknown'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-gray-600">{resource.description || "No description available"}</p>
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center justify-between">
              <span>Quantity:</span>
              <span className="font-medium">{resource.quantity || 0} {resource.unit || 'units'}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {resource.location || "Location not specified"}
            </div>
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              {resource.provider_ngo || "Provider not specified"}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
              {resource.category || "General"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
