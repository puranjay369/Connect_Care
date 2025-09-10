import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Mail, MapPin, Phone, Users } from "lucide-react";

export default function VolunteerCard({ volunteer }) {
  if (!volunteer) return null;

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-orange-600 bg-orange-100';
      case 'unavailable': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            {volunteer.full_name || "Volunteer"}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(volunteer.availability_status)}`}>
            {volunteer.availability_status || 'unknown'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {volunteer.location || "Location not specified"}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {volunteer.phone || "Phone not available"}
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {volunteer.email || "Email not available"}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
              {volunteer.skills?.join(', ') || "General"}
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
              {volunteer.experience_level || "Beginner"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
