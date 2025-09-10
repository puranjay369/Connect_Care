export default function EmergencyFilters({ filters, onFilterChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="font-medium mb-3">Filters</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            value={filters?.category || 'all'} 
            onChange={(e) => onFilterChange?.({ ...filters, category: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All Categories</option>
            <option value="natural_disaster">Natural Disaster</option>
            <option value="medical">Medical Emergency</option>
            <option value="fire">Fire Emergency</option>
            <option value="accident">Traffic Accident</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
          <select 
            value={filters?.severity || 'all'} 
            onChange={(e) => onFilterChange?.({ ...filters, severity: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
