import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Emergency } from "@/entities/Emergency";
import {
  AlertTriangle,
  Plus
} from "lucide-react";
import { useEffect, useState } from "react";
import EmergencyCard from "../Components/emergencies/EmergencyCard";
import EmergencyFilters from "../Components/emergencies/EmergencyFilters";
import EmergencyForm from "../Components/emergencies/EmergencyForm";

export default function EmergenciesPage() {
  const [emergencies, setEmergencies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    category: "all",
    severity: "all",
    location: ""
  });

  useEffect(() => {
    loadEmergencies();
  }, []);

  const loadEmergencies = async () => {
    setIsLoading(true);
    try {
      const data = await Emergency.list('-created_date', 100);
      setEmergencies(data);
    } catch (error) {
      console.error("Error loading emergencies:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (emergencyData) => {
    try {
      await Emergency.create(emergencyData);
      setShowForm(false);
      loadEmergencies();
    } catch (error) {
      console.error("Error creating emergency:", error);
    }
  };

  const filterEmergencies = (emergencies) => {
    let filtered = emergencies;

    // Filter by status tab
    if (activeTab !== "all") {
      filtered = filtered.filter(e => e.status === activeTab);
    }

    // Apply additional filters
    if (filters.category !== "all") {
      filtered = filtered.filter(e => e.category === filters.category);
    }

    if (filters.severity !== "all") {
      filtered = filtered.filter(e => e.severity === filters.severity);
    }

    if (filters.location) {
      filtered = filtered.filter(e => 
        e.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredEmergencies = filterEmergencies(emergencies);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            Emergency Reports
          </h1>
          <p className="text-slate-600 mt-2">
            Monitor and respond to active emergency situations in real-time
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Report Emergency
        </Button>
      </div>

      {/* Emergency Form */}
      {showForm && (
        <EmergencyForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Filters */}
      <EmergencyFilters filters={filters} onFiltersChange={setFilters} />

      {/* Tabs for Status */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({emergencies.length})</TabsTrigger>
          <TabsTrigger value="active" className="text-red-600">
            Active ({emergencies.filter(e => e.status === 'active').length})
          </TabsTrigger>
          <TabsTrigger value="responding" className="text-blue-600">
            Responding ({emergencies.filter(e => e.status === 'responding').length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="text-green-600">
            Resolved ({emergencies.filter(e => e.status === 'resolved').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-8">
          {isLoading ? (
            <div className="grid gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="space-y-0 pb-2">
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded" />
                      <div className="h-4 bg-slate-200 rounded w-2/3" />
                      <div className="flex gap-2 mt-4">
                        <div className="h-6 bg-slate-200 rounded-full w-16" />
                        <div className="h-6 bg-slate-200 rounded-full w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredEmergencies.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No emergencies found
                </h3>
                <p className="text-slate-500">
                  {activeTab === "all" 
                    ? "No emergency reports match your current filters." 
                    : `No ${activeTab} emergencies at this time.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredEmergencies.map((emergency) => (
                <EmergencyCard key={emergency.id} emergency={emergency} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}