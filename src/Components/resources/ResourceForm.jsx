import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

export default function ResourceForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    quantity: '',
    unit: '',
    location: '',
    provider_ngo: '',
    availability: 'available'
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
          <h2 className="text-lg font-semibold">Add Resource</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Resource Name"
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
            <option value="medical_supplies">Medical Supplies</option>
            <option value="food_water">Food & Water</option>
            <option value="shelter_materials">Shelter Materials</option>
            <option value="transportation">Transportation</option>
            <option value="equipment">Equipment</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <Input
              name="unit"
              placeholder="Unit (e.g., boxes, liters)"
              value={formData.unit}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <Input
            name="provider_ngo"
            placeholder="Provider Organization"
            value={formData.provider_ngo}
            onChange={handleChange}
            required
          />
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="deployed">Deployed</option>
          </select>
          <div className="flex gap-2">
            <Button type="submit">Add Resource</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
