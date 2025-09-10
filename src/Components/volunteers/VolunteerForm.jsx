import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

export default function VolunteerForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    skills: [],
    experience_level: '',
    availability_status: 'available'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (e) => {
    if (e.target.name === 'skills') {
      setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Register Volunteer</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
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
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <Input
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills.join(', ')}
            onChange={handleChange}
            required
          />
          <select
            name="experience_level"
            value={formData.experience_level}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">Select Experience Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
          <select
            name="availability_status"
            value={formData.availability_status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <div className="flex gap-2">
            <Button type="submit">Register Volunteer</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
