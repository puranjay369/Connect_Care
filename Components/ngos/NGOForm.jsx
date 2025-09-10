import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, X, Save } from "lucide-react";

const specializations = [
  { id: "disaster_relief", label: "Disaster Relief" },
  { id: "medical_aid", label: "Medical Aid" },
  { id: "food_security", label: "Food Security" },
  { id: "shelter", label: "Shelter" },
  { id: "search_rescue", label: "Search & Rescue" },
  { id: "logistics", label: "Logistics" },
  { id: "mental_health", label: "Mental Health" },
  { id: "education", label: "Education" },
  { id: "child_protection", label: "Child Protection" },
  { id: "elder_care", label: "Elder Care" },
  { id: "infrastructure", label: "Infrastructure" }
];

export default function NGOForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    location: "",
    service_areas: "",
    specializations: [],
    resources: "",
    volunteer_count: "",
    verified: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecializationChange = (specializationId, checked) => {
    setFormData(prev => ({
      ...prev,
      specializations: checked 
        ? [...prev.specializations, specializationId]
        : prev.specializations.filter(id => id !== specializationId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ngoData = {
        ...formData,
        service_areas: formData.service_areas 
          ? formData.service_areas.split(',').map(area => area.trim()).filter(Boolean)
          : [],
        resources: formData.resources 
          ? formData.resources.split(',').map(resource => resource.trim()).filter(Boolean)
          : [],
        volunteer_count: formData.volunteer_count ? parseInt(formData.volunteer_count) : 0
      };

      await onSubmit(ngoData);
    } catch (error) {
      console.error("Error submitting NGO:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader className="bg-blue-100 rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-800">
            <Shield className="w-6 h-6" />
            Register NGO
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-blue-600 hover:text-blue-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
              Organization Details
            </h3>
            
            <div>
              <Label htmlFor="name" className="text-sm font-semibold">
                Organization Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter organization name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-semibold">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your organization's mission and activities..."
                required
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_email" className="text-sm font-semibold">
                  Contact Email *
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange("contact_email", e.target.value)}
                  placeholder="contact@organization.org"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contact_phone" className="text-sm font-semibold">
                  Contact Phone
                </Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website" className="text-sm font-semibold">
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://www.organization.org"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-semibold">
                  Primary Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State/Region"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
              Service Information
            </h3>
            
            <div>
              <Label htmlFor="service_areas" className="text-sm font-semibold">
                Service Areas
              </Label>
              <Input
                id="service_areas"
                value={formData.service_areas}
                onChange={(e) => handleInputChange("service_areas", e.target.value)}
                placeholder="Metro City, Suburban District, Rural Counties (separate with commas)"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold mb-3 block">
                Specializations *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {specializations.map((spec) => (
                  <div key={spec.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec.id}
                      checked={formData.specializations.includes(spec.id)}
                      onCheckedChange={(checked) => handleSpecializationChange(spec.id, checked)}
                    />
                    <Label htmlFor={spec.id} className="text-sm">
                      {spec.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="resources" className="text-sm font-semibold">
                  Available Resources
                </Label>
                <Textarea
                  id="resources"
                  value={formData.resources}
                  onChange={(e) => handleInputChange("resources", e.target.value)}
                  placeholder="Emergency shelters, Medical supplies, Food distribution (separate with commas)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="volunteer_count" className="text-sm font-semibold">
                  Number of Volunteers
                </Label>
                <Input
                  id="volunteer_count"
                  type="number"
                  min="0"
                  value={formData.volunteer_count}
                  onChange={(e) => handleInputChange("volunteer_count", e.target.value)}
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || formData.specializations.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Registering...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Register NGO
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}