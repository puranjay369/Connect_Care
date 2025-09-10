import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { MapPin, Phone, Shield } from "lucide-react";

export default function NGOCard({ ngo }) {
  if (!ngo) return null;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <h3 className="font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          {ngo.name || "NGO Organization"}
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-gray-600">{ngo.description || "No description available"}</p>
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {ngo.address || "Address not available"}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {ngo.contact_phone || "Phone not available"}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
              {ngo.category || "General"}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
              {ngo.verification_status || "Pending"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
