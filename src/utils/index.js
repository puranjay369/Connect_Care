export function createPageUrl(pageName) {
  return `/${pageName.toLowerCase()}`;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function formatDateTime(date) {
  return new Date(date).toLocaleString();
}

export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case 'critical':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'high':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'resolved':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'active':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'responding':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

export function getSeverityColor(severity) {
  return getStatusColor(severity);
}
