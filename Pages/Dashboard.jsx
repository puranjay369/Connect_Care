import React, { useState, useEffect } from "react";
import { Emergency, NGO, Resource, Volunteer } from "@/entities/all";
import { 
  AlertTriangle, 
  Shield, 
  Package, 
  Users, 
  TrendingUp,
  Clock,
  MapPin,
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import StatsCard from "../../components/dashboard/StatsCard";
import ActiveEmergencies from "../../components/dashboard/ActiveEmergencies";
import RecentActivity from "../../components/dashboard/RecentActivity";
import ResourceStatus from "../../components/dashboard/ResourceStatus";

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeEmergencies: 0,
    totalNGOs: 0,
    availableResources: 0,
    activeVolunteers: 0
  });
  const [emergencies, setEmergencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [emergencyData, ngoData, resourceData, volunteerData] = await Promise.all([
        Emergency.list('-created_date', 50),
        NGO.list('-created_date', 50),
        Resource.list('-created_date', 50),
        Volunteer.list('-created_date', 50)
      ]);

      setEmergencies(emergencyData);
      setStats({
        activeEmergencies: emergencyData.filter(e => e.status === 'active' || e.status === 'responding').length,
        totalNGOs: ngoData.filter(n => n.verified).length,
        availableResources: resourceData.filter(r => r.availability === 'available').length,
        activeVolunteers: volunteerData.filter(v => v.availability === 'available').length
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">
          Emergency Response Dashboard
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Real-time coordination center for emergency response. Monitor active crises, 
          coordinate resources, and connect communities with life-saving support.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Emergencies"
          value={stats.activeEmergencies}
          icon={AlertTriangle}
          trend="2 new today"
          color="red"
          isLoading={isLoading}
        />
        <StatsCard
          title="Verified NGOs"
          value={stats.totalNGOs}
          icon={Shield}
          trend="12% growth"
          color="blue"
          isLoading={isLoading}
        />
        <StatsCard
          title="Available Resources"
          value={stats.availableResources}
          icon={Package}
          trend="85% capacity"
          color="green"
          isLoading={isLoading}
        />
        <StatsCard
          title="Active Volunteers"
          value={stats.activeVolunteers}
          icon={Users}
          trend="Ready to help"
          color="purple"
          isLoading={isLoading}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Emergencies - Takes 2/3 width */}
        <div className="lg:col-span-2">
          <ActiveEmergencies 
            emergencies={emergencies}
            isLoading={isLoading}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RecentActivity isLoading={isLoading} />
          <ResourceStatus isLoading={isLoading} />
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">Need Immediate Help?</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Report an emergency, request resources, or volunteer your services. 
              Every action counts in saving lives and supporting communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Emergencies")}>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Report Emergency
                </Button>
              </Link>
              <Link to={createPageUrl("Volunteers")}>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-3">
                  <Users className="w-5 h-5 mr-2" />
                  Volunteer Now
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}