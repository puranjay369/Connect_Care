// Core integration utilities for the Connect Care application
// This module provides shared functionality and constants across the app

export const EMERGENCY_TYPES = {
  natural_disaster: 'Natural Disaster',
  medical: 'Medical Emergency', 
  fire: 'Fire Emergency',
  accident: 'Traffic Accident',
  mental_health: 'Mental Health Crisis',
  security: 'Security Incident',
  other: 'Other Emergency'
};

export const SEVERITY_LEVELS = {
  low: 'Low',
  medium: 'Medium', 
  high: 'High',
  critical: 'Critical'
};

export const STATUS_TYPES = {
  active: 'Active',
  responding: 'Responding',
  resolved: 'Resolved',
  cancelled: 'Cancelled'
};

export const RESOURCE_TYPES = {
  medical: 'Medical Supplies',
  food: 'Food & Water',
  shelter: 'Shelter Materials',
  transport: 'Transportation',
  personnel: 'Personnel',
  equipment: 'Equipment',
  other: 'Other Resources'
};

export const NGO_TYPES = {
  healthcare: 'Healthcare',
  social_welfare: 'Social Welfare',
  education: 'Education',
  environmental: 'Environmental',
  disaster_relief: 'Disaster Relief',
  human_rights: 'Human Rights',
  other: 'Other'
};

export const VOLUNTEER_EXPERIENCE_LEVELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate', 
  advanced: 'Advanced',
  expert: 'Expert'
};

export const AVAILABILITY_STATUS = {
  available: 'Available',
  busy: 'Busy',
  unavailable: 'Unavailable'
};

// Utility functions
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical': return 'destructive';
    case 'high': return 'destructive';
    case 'medium': return 'warning';
    case 'low': return 'secondary';
    default: return 'secondary';
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'destructive';
    case 'responding': return 'warning';
    case 'resolved': return 'success';
    case 'cancelled': return 'secondary';
    default: return 'secondary';
  }
};

export const getAvailabilityColor = (availability) => {
  switch (availability) {
    case 'available': return 'success';
    case 'busy': return 'warning';
    case 'unavailable': return 'secondary';
    case 'limited': return 'warning';
    default: return 'secondary';
  }
};

// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

// Location utilities
export const formatLocation = (latitude, longitude) => {
  if (!latitude || !longitude) return null;
  return `${parseFloat(latitude).toFixed(4)}, ${parseFloat(longitude).toFixed(4)}`;
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// API utilities (placeholder for future backend integration)
export const apiRequest = async (endpoint, options = {}) => {
  // This will be replaced with actual API calls
  console.log('API Request:', endpoint, options);
  return { success: true, data: null };
};

export const uploadFile = async (file, type = 'image') => {
  // Placeholder for file upload functionality
  console.log('File upload:', file.name, type);
  return { success: true, url: 'placeholder-url' };
};

// Local storage utilities
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Notification utilities (placeholder)
export const showNotification = (message, type = 'info') => {
  console.log(`[${type.toUpperCase()}] ${message}`);
  // This will be replaced with actual notification system
};

export const showSuccessMessage = (message) => showNotification(message, 'success');
export const showErrorMessage = (message) => showNotification(message, 'error');
export const showWarningMessage = (message) => showNotification(message, 'warning');

// Mock LLM invocation function for AI-powered features
export const InvokeLLM = async (prompt, context = {}) => {
  // This is a mock implementation for demo purposes
  // In a real application, this would connect to an actual LLM service
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  if (prompt.includes('generate')) {
    return {
      success: true,
      response: "This is a mock response from the LLM. In a real implementation, this would connect to an actual AI service.",
      suggestions: [
        "Implement proper emergency response protocols",
        "Coordinate with local authorities",
        "Ensure proper resource allocation",
        "Maintain clear communication channels"
      ]
    };
  }
  
  return {
    success: true,
    response: "Mock LLM response: " + prompt,
    suggestions: []
  };
};

export default {
  EMERGENCY_TYPES,
  SEVERITY_LEVELS, 
  STATUS_TYPES,
  RESOURCE_TYPES,
  NGO_TYPES,
  VOLUNTEER_EXPERIENCE_LEVELS,
  AVAILABILITY_STATUS,
  formatDate,
  getSeverityColor,
  getStatusColor,
  getAvailabilityColor,
  validateEmail,
  validatePhone,
  formatLocation,
  calculateDistance,
  apiRequest,
  uploadFile,
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
  showNotification,
  showSuccessMessage,
  showErrorMessage,
  showWarningMessage,
  InvokeLLM
};
