import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  Users,
  CheckCircle,
  Clock
} from "lucide-react";

const specializationColors = {
  disaster_relief: "bg-red-100 text-red-800 border-red-200",
  medical_aid: "bg-blue-100 text-blue-800 border-blue-200",
  food_security: "bg-green-100 text-green-800 border-green-200",
  shelter: "bg-purple-100 text-purple-800 border-purple-200",
  search_rescue: "bg-orange-100 text-orange-800 border-orange-200",
  logistics: "bg-gray-100 text-gray-800 border-gray-200",
  mental_health: "bg-pink-100 text-pink-800 border-pink-200",
  education: "bg-yellow-100 text-yellow-800 border-yellow-200",
  child_protection: "bg-cyan-100 text-cyan-800 border-cyan-200",
  elder_care: "bg-indigo-100 text-indigo-800 border-indigo-200",
  infrastructure: "bg-teal-100 text-teal-800 border-teal-200"
};

export default function NGOCard({ ngo }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-slate-900">{ngo.name}</h3>
              {ngo.verified ? (
                <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Pending
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              {ngo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {ngo.location}
                </div>
              )}
              {ngo.volunteer_count && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {ngo.volunteer_count} volunteers
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {ngo.description && (
          <p className="text-slate-700 leading-relaxed">
            {ngo.description}
          </p>
        )}

        {ngo.specializations && ngo.specializations.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Specializations:</h4>
            <div className="flex flex-wrap gap-2">
              {ngo.specializations.map((spec) => (
                <Badge 
                  key={spec} 
                  className={specializationColors[spec] || "bg-gray-100 text-gray-800"}
                >
                  {spec.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {ngo.service_areas && ngo.service_areas.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Service Areas:</h4>
            <p className="text-sm text-slate-600">
              {ngo.service_areas.join(", ")}
            </p>
          </div>
        )}

        {ngo.resources && ngo.resources.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Available Resources:</h4>
            <p className="text-sm text-slate-600">
              {ngo.resources.join(", ")}
            </p>
          </div>
        )}

        {/* Contact Information */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div className="space-y-1">
            {ngo.contact_email && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="w-4 h-4" />
                <a 
                  href={`mailto:${ngo.contact_email}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {ngo.contact_email}
                </a>
              </div>
            )}
            {ngo.contact_phone && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4" />
                <a 
                  href={`tel:${ngo.contact_phone}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {ngo.contact_phone}
                </a>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {ngo.contact_phone && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`tel:${ngo.contact_phone}`)}
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            )}
            {ngo.website && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(ngo.website, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Visit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}