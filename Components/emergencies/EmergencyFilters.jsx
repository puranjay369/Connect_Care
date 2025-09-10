import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter, Search } from "lucide-react";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "natural_disaster", label: "Natural Disaster" },
  { value: "medical_emergency", label: "Medical Emergency" },
  { value: "fire", label: "Fire" },
  { value: "accident", label: "Accident" },
  { value: "violence", label: "Violence" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "other", label: "Other" }
];

const severityLevels = [
  { value: "all", label: "All Severity" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" }
];

export default function EmergencyFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (field, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="location-search" className="text-sm font-medium">
              Location
            </Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="location-search"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                placeholder="Search by location..."
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category-filter" className="text-sm font-medium">
              Category
            </Label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="severity-filter" className="text-sm font-medium">
              Severity
            </Label>
            <Select value={filters.severity} onValueChange={(value) => handleFilterChange("severity", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {severityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}