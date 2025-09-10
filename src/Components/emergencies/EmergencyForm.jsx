import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

export default function EmergencyForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    severity: '',
    location: '',
    contact_person: '',
    contact_phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Report Emergency</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Emergency Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            rows={3}
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">Select Category</option>
            <option value="natural_disaster">Natural Disaster</option>
            <option value="medical">Medical Emergency</option>
            <option value="fire">Fire Emergency</option>
            <option value="accident">Traffic Accident</option>
          </select>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">Select Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <Input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <Input
            name="contact_person"
            placeholder="Contact Person"
            value={formData.contact_person}
            onChange={handleChange}
          />
          <Input
            name="contact_phone"
            placeholder="Contact Phone"
            value={formData.contact_phone}
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <Button type="submit">Submit Emergency</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
