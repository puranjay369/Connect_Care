
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, X, Save, Sparkles } from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";

const categories = [
  { value: "natural_disaster", label: "Natural Disaster", emoji: "🌪️" },
  { value: "medical_emergency", label: "Medical Emergency", emoji: "🏥" },
  { value: "fire", label: "Fire", emoji: "🔥" },
  { value: "accident", label: "Accident", emoji: "🚗" },
  { value: "violence", label: "Violence", emoji: "⚠️" },
  { value: "infrastructure", label: "Infrastructure", emoji: "🏗️" },
  { value: "other", label: "Other", emoji: "📋" }
];

const severityLevels = [
  { value: "low", label: "Low", color: "text-green-600" },
  { value: "medium", label: "Medium", color: "text-yellow-600" },
  { value: "high", label: "High", color: "text-orange-600" },
  { value: "critical", label: "Critical", color: "text-red-600" }
];

export default function EmergencyForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    severity: "medium",
    affected_people: "",
    priority_needs: "",
    contact_person: "",
    contact_phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAiAnalysis = async () => {
    if (!formData.description) return;
    setIsAnalyzing(true);
    try {
      const aiSchema = {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "A concise, descriptive title for the emergency, under 10 words."
          },
          category: {
            type: "string",
            description: "The most appropriate category for the emergency.",
            enum: categories.map(c => c.value).filter(c => c !== "other")
          },
          severity: {
            type: "string",
            description: "The assessed severity level.",
            enum: severityLevels.map(s => s.value)
          },
          priority_needs: {
            type: "array",
            description: "A list of 3-5 most urgent needs as short phrases.",
            items: { type: "string" }
          }
        },
        required: ["title", "category", "severity", "priority_needs"]
      };

      const result = await InvokeLLM({
        prompt: `You are an expert emergency response dispatcher. Analyze the following report from a civilian. Your task is to extract key information and format it as JSON.
        Report: "${formData.description}"`,
        response_json_schema: aiSchema,
      });

      if (result && result.output) {
        setFormData(prev => ({
          ...prev,
          title: result.output.title || prev.title,
          category: result.output.category || prev.category,
          severity: result.output.severity || prev.severity,
          priority_needs: result.output.priority_needs ? result.output.priority_needs.join(', ') : prev.priority_needs
        }));
      }
    } catch (error) {
      console.error("AI analysis failed:", error);
    }
    setIsAnalyzing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emergencyData = {
        ...formData,
        affected_people: formData.affected_people ? parseInt(formData.affected_people) : undefined,
        priority_needs: formData.priority_needs
          ? formData.priority_needs.split(',').map(need => need.trim()).filter(Boolean)
          : []
      };

      await onSubmit(emergencyData);
    } catch (error) {
      console.error("Error submitting emergency:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="border-2 border-red-200 bg-red-50">
      <CardHeader className="bg-red-100 rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-6 h-6" />
            Report Emergency
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-red-600 hover:text-red-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-semibold">
                Emergency Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Brief description (AI can help generate this)"
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-sm font-semibold">
                  Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <span>{category.emoji}</span>
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="severity" className="text-sm font-semibold">
                  Severity Level *
                </Label>
                <Select value={formData.severity} onValueChange={(value) => handleInputChange("severity", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {severityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <span className={`font-medium ${level.color}`}>
                          {level.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                placeholder="Address or area where the emergency is occurring"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-semibold">
                Detailed Description
              </Label>
              <div className="relative mt-1">
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Provide detailed information about the situation... The more detail, the better the AI analysis."
                  className="min-h-[120px] pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-purple-600 hover:text-purple-800 hover:bg-purple-100 disabled:opacity-50"
                  onClick={handleAiAnalysis}
                  disabled={isAnalyzing || !formData.description}
                  title="Analyze with AI"
                >
                  {isAnalyzing ? (
                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Fill in the description and click the ✨ icon to let AI help complete the form.
              </p>
            </div>
          </div>

          {/* Impact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
              Impact Assessment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="affected_people" className="text-sm font-semibold">
                  Number of People Affected
                </Label>
                <Input
                  id="affected_people"
                  type="number"
                  min="0"
                  value={formData.affected_people}
                  onChange={(e) => handleInputChange("affected_people", e.target.value)}
                  placeholder="Estimated number"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="priority_needs" className="text-sm font-semibold">
                  Priority Needs
                </Label>
                <Input
                  id="priority_needs"
                  value={formData.priority_needs}
                  onChange={(e) => handleInputChange("priority_needs", e.target.value)}
                  placeholder="Medical aid, food, shelter (separate with commas)"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_person" className="text-sm font-semibold">
                  Contact Person
                </Label>
                <Input
                  id="contact_person"
                  value={formData.contact_person}
                  onChange={(e) => handleInputChange("contact_person", e.target.value)}
                  placeholder="Name of person to contact"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contact_phone" className="text-sm font-semibold">
                  Phone Number
                </Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                  placeholder="Contact phone number"
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
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Reporting...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Report Emergency
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
