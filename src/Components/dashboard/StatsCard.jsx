import { Card, CardContent } from "@/Components/ui/card";

export default function StatsCard({ title, value, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    red: "text-red-600",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
          </div>
          {Icon && <Icon className={`w-8 h-8 ${colorClasses[color]}`} />}
        </div>
      </CardContent>
    </Card>
  );
}
