import React, { useState, useEffect } from "react";
import { Volunteer } from "@/entities/Volunteer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Plus, 
  Search, 
  MapPin,
  CheckCircle
} from "lucide-react";
import VolunteerForm from "../../components/volunteers/VolunteerForm";
import VolunteerCard from "../../components/volunteers/VolunteerCard";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    setIsLoading(true);
    try {
      const data = await Volunteer.list('-created_date', 100);
      setVolunteers(data);
    } catch (error) {
      console.error("Error loading volunteers:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (volunteerData) => {
    try {
      await Volunteer.create(volunteerData);
      setShowForm(false);
      loadVolunteers();
    } catch (error) {
      console.error("Error creating volunteer:", error);
    }
  };

  const filterVolunteers = () => {
    let filtered = volunteers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(volunteer =>
        volunteer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by availability tab
    if (activeTab !== "all") {
      filtered = filtered.filter(volunteer => volunteer.availability === activeTab);
    }

    return filtered;
  };

  const filteredVolunteers = filterVolunteers();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            Volunteer Network
          </h1>
          <p className="text-slate-600 mt-2">
            Connect with skilled volunteers ready to help during emergencies
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Join as Volunteer
        </Button>
      </div>

      {/* Volunteer Form */}
      {showForm && (
        <VolunteerForm
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
          placeholder="Search volunteers..."
          className="pl-10"
        />
      </div>

      {/* Availability Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({volunteers.length})</TabsTrigger>
          <TabsTrigger value="available" className="text-green-600">
            Available ({volunteers.filter(v => v.availability === 'available').length})
          </TabsTrigger>
          <TabsTrigger value="on_assignment" className="text-blue-600">
            On Assignment ({volunteers.filter(v => v.availability === 'on_assignment').length})
          </TabsTrigger>
          <TabsTrigger value="unavailable" className="text-gray-600">
            Unavailable ({volunteers.filter(v => v.availability === 'unavailable').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {volunteers.filter(v => v.availability === 'available').length}
                </div>
                <div className="text-sm text-slate-600 mt-1">Available Now</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {volunteers.filter(v => v.verified).length}
                </div>
                <div className="text-sm text-slate-600 mt-1">Verified</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {volunteers.filter(v => v.experience_level === 'expert' || v.experience_level === 'experienced').length}
                </div>
                <div className="text-sm text-slate-600 mt-1">Experienced</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {new Set(volunteers.flatMap(v => v.skills || [])).size}
                </div>
                <div className="text-sm text-slate-600 mt-1">Skills Available</div>
              </CardContent>
            </Card>
          </div>

          {/* Volunteers List */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-slate-200 rounded w-2/3 mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
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
          ) : filteredVolunteers.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No volunteers found
                </h3>
                <p className="text-slate-500 mb-4">
                  {searchTerm || activeTab !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Be the first to join our volunteer network"}
                </p>
                {!searchTerm && activeTab === "all" && (
                  <Button onClick={() => setShowForm(true)}>
                    Join as Volunteer
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVolunteers.map((volunteer) => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}