import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Resource } from "@/entities/Resource";
import {
  Package,
  Plus,
  Search
} from "lucide-react";
import { useEffect, useState } from "react";
import ResourceCard from "../Components/resources/ResourceCard";
import ResourceForm from "../Components/resources/ResourceForm";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const data = await Resource.list('-created_date', 100);
      setResources(data);
    } catch (error) {
      console.error("Error loading resources:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (resourceData) => {
    try {
      await Resource.create(resourceData);
      setShowForm(false);
      loadResources();
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.provider_ngo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(resource => resource.category === activeCategory);
    }

    return filtered;
  };

  const filteredResources = filterResources();

  const categories = [
    { value: "all", label: "All Resources" },
    { value: "medical_supplies", label: "Medical Supplies", emoji: "🏥" },
    { value: "food_water", label: "Food & Water", emoji: "🥤" },
    { value: "shelter_materials", label: "Shelter Materials", emoji: "🏠" },
    { value: "transportation", label: "Transportation", emoji: "🚗" },
    { value: "communication", label: "Communication", emoji: "📡" },
    { value: "equipment", label: "Equipment", emoji: "🔧" },
    { value: "volunteers", label: "Volunteers", emoji: "👥" },
    { value: "funding", label: "Funding", emoji: "💰" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Package className="w-8 h-8 text-green-600" />
            Resource Management
          </h1>
          <p className="text-slate-600 mt-2">
            Track and coordinate emergency supplies, equipment, and volunteer resources
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Resource Form */}
      {showForm && (
        <ResourceForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search resources..."
          className="pl-10"
        />
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 w-full">
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value} className="text-xs">
              {category.emoji && <span className="mr-1">{category.emoji}</span>}
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {filteredResources.filter(r => r.availability === 'available').length}
                </div>
                <div className="text-sm text-slate-600 mt-1">Available</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {filteredResources.filter(r => r.availability === 'reserved').length}
                </div>
                <div className="text-sm text-slate-600 mt-1">Reserved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {filteredResources.filter(r => r.availability === 'deployed').length}
                </div>
                <div className="text-sm text-slate-600 mt-1">Deployed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-slate-600">
                  {new Set(filteredResources.map(r => r.provider_ngo)).size}
                </div>
                <div className="text-sm text-slate-600 mt-1">Providers</div>
              </CardContent>
            </Card>
          </div>

          {/* Resources List */}
          {isLoading ? (
            <div className="grid gap-6">
              {Array(4).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-slate-200 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded" />
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="flex gap-2 mt-4">
                        <div className="h-6 bg-slate-200 rounded-full w-16" />
                        <div className="h-6 bg-slate-200 rounded-full w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredResources.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No resources found
                </h3>
                <p className="text-slate-500 mb-4">
                  {searchTerm || activeCategory !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Start by adding your first resource"}
                </p>
                {!searchTerm && activeCategory === "all" && (
                  <Button onClick={() => setShowForm(true)}>
                    Add First Resource
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}