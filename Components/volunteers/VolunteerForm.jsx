import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, X, Save } from "lucide-react";

const skills = [
  { id: "medical", label: "Medical" },
  { id: "first_aid", label: "First Aid" },
  { id: "search_rescue", label: "Search & Rescue" },
  { id: "logistics", label: "Logistics" },
  { id: "communication", label: "Communication" },
  { id: "counseling", label: "Counseling" },
  { id: "construction", label: "Construction" },
  { id: "cooking", label: "Cooking" },
  { id: "childcare", label: "Childcare" },
  { id: "translation", label: "Translation" },
  { id: "driving", label: "Driving" },
  { id: "tech_support", label: "Tech Support" }
];

const experienceLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "experienced", label: "Experienced" },
  { value: "expert", label: "Expert" }
];

export default function VolunteerForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    skills: [],
    availability: "available",
    experience_level: "beginner",
    languages: "",
    transportation: false,
    verified: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillChange = (skillId, checked) => {
    setFormData(prev => ({
      ...prev,
      skills: checked 
        ? [...prev.skills, skillId]
        : prev.skills.filter(id => id !== skillId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const volunteerData = {
        ...formData,
        languages: formData.languages 
          ? formData.languages.split(',').map(lang => lang.trim()).filter(Boolean)
          : []
      };

      await onSubmit(volunteerData);
    } catch (error) {
      console.error("Error submitting volunteer:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="border-2 border-purple-200 bg-purple-50">
      <CardHeader className="bg-purple-100 rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-800">
            <Users className="w-6 h-6" />
            Join as Volunteer
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-purple-600 hover:text-purple-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
              Personal Information
            </h3>
            
            <div>
              <Label htmlFor="full_name" className="text-sm font-semibold">
                Full Name *
              </Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
                placeholder="Enter your full name"
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-semibold">
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="City, State/Region"
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* Skills & Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
              Skills & Experience
            </h3>
            
            <div>
              <Label className="text-sm font-semibold mb-3 block">
                Skills *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill.id}
                      checked={formData.skills.includes(skill.id)}
                      onCheckedChange={(checked) => handleSkillChange(skill.id, checked)}
                    />
                    <Label htmlFor={skill.id} className="text-sm">
                      {skill.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="experience_level" className="text-sm font-semibold">
                Experience Level
              </Label>
              <Select value={formData.experience_level} onValueChange={(value) => handleInputChange("experience_level", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="languages" className="text-sm font-semibold">
                  Languages Spoken
                </Label>
                <Input
                  id="languages"
                  value={formData.languages}
                  onChange={(e) => handleInputChange("languages", e.target.value)}
                  placeholder="English, Spanish, French (separate with commas)"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <Checkbox
                  id="transportation"
                  checked={formData.transportation}
                  onCheckedChange={(checked) => handleInputChange("transportation", checked)}
                />
                <Label htmlFor="transportation" className="text-sm">
                  I have my own transportation
                </Label>
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
              disabled={isSubmitting || formData.skills.length === 0}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Joining...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Join Network
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}