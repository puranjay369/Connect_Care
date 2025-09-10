import React, { useState, useEffect } from "react";
import { NGO } from "@/entities/NGO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  Mail,
  ExternalLink,
  Users,
  CheckCircle
} from "lucide-react";
import NGOForm from "../../components/ngos/NGOForm";
import NGOCard from "../../components/ngos/NGOCard";

export default function NGOsPage() {
  const [ngos, setNgos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadNGOs();
  }, []);

  const loadNGOs = async () => {
    setIsLoading(true);
    try {
      const data = await NGO.list('-created_date', 100);
      setNgos(data);
    } catch (error) {
      console.error("Error loading NGOs:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (ngoData) => {
    try {
      await NGO.create(ngoData);
      setShowForm(false);
      loadNGOs();
    } catch (error) {
      console.error("Error creating NGO:", error);
    }
  };

  const filteredNGOs = ngos.filter(ngo =>
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ngo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ngo.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifiedNGOs = filteredNGOs.filter(ngo => ngo.verified);
  const unverifiedNGOs = filteredNGOs.filter(ngo => !ngo.verified);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            NGO Directory
          </h1>
          <p className="text-slate-600 mt-2">
            Connect with verified response organizations and emergency services
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Register NGO
        </Button>
      </div>

      {/* NGO Form */}
      {showForm && (
        <NGOForm
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
          placeholder="Search organizations..."
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{verifiedNGOs.length}</div>
            <div className="text-sm text-slate-600 mt-1">Verified Organizations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {verifiedNGOs.reduce((sum, ngo) => sum + (ngo.volunteer_count || 0), 0)}
            </div>
            <div className="text-sm text-slate-600 mt-1">Total Volunteers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">
              {new Set(verifiedNGOs.flatMap(ngo => ngo.service_areas || [])).size}
            </div>
            <div className="text-sm text-slate-600 mt-1">Areas Covered</div>
          </CardContent>
        </Card>
      </div>

      {/* Verified NGOs */}
      {verifiedNGOs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Verified Organizations ({verifiedNGOs.length})
          </h2>
          <div className="grid gap-6">
            {verifiedNGOs.map((ngo) => (
              <NGOCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        </div>
      )}

      {/* Unverified NGOs */}
      {unverifiedNGOs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Pending Verification ({unverifiedNGOs.length})
          </h2>
          <div className="grid gap-6">
            {unverifiedNGOs.map((ngo) => (
              <NGOCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredNGOs.length === 0 && !isLoading && (
        <Card>
          <CardContent className="text-center py-12">
            <Shield className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {searchTerm ? "No organizations found" : "No NGOs registered yet"}
            </h3>
            <p className="text-slate-500 mb-4">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : "Be the first to register your organization"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowForm(true)}>
                Register Your NGO
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-6">
          {Array(3).fill(0).map((_, i) => (
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
      )}
    </div>
  );
}