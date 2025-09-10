import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Package, 
  Heart,
  BarChart3,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
    description: "Emergency overview"
  },
  {
    title: "Emergency Reports",
    url: createPageUrl("Emergencies"),
    icon: AlertTriangle,
    description: "Active incidents"
  },
  {
    title: "NGO Directory",
    url: createPageUrl("NGOs"),
    icon: Shield,
    description: "Response organizations"
  },
  {
    title: "Resources",
    url: createPageUrl("Resources"),
    icon: Package,
    description: "Supplies & equipment"
  },
  {
    title: "Volunteers",
    url: createPageUrl("Volunteers"),
    icon: Users,
    description: "Community helpers"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActivePage = (url) => {
    return location.pathname === url;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">ConnectCare</h1>
                <p className="text-xs text-slate-500 -mt-1">Bridging Hearts in Crisis</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActivePage(item.url)
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePage(item.url)
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <div>
                      <div>{item.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">ConnectCare</div>
                <div className="text-xs text-slate-500">Ensuring no one faces disasters alone</div>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              Real-time coordination for maximum impact when every second counts
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}