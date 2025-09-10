import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

export default function NGOForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    contact_person: '',
    contact_phone: '',
    email: '',
    website: ''
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
          <h2 className="text-lg font-semibold">Register NGO</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="NGO Name"
            value={formData.name}
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
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="disaster_relief">Disaster Relief</option>
            <option value="social_welfare">Social Welfare</option>
          </select>
          <Input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Input
            name="contact_person"
            placeholder="Contact Person"
            value={formData.contact_person}
            onChange={handleChange}
            required
          />
          <Input
            name="contact_phone"
            placeholder="Contact Phone"
            value={formData.contact_phone}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="website"
            placeholder="Website (optional)"
            value={formData.website}
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <Button type="submit">Register NGO</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
