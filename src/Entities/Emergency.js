// Emergency Entity - Mock implementation for demo purposes
// In a real application, this would connect to an actual API

class MockEntity {
  static async list(orderBy = '-created_date', limit = 100) {
    await this._delay();
    return this._getMockData().slice(0, limit);
  }

  static async get(id) {
    await this._delay();
    const items = this._getMockData();
    return items.find(item => item.id === id) || null;
  }

  static async create(data) {
    await this._delay();
    const newItem = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    };
    return newItem;
  }

  static async update(id, data) {
    await this._delay();
    return {
      ...data,
      id,
      updated_date: new Date().toISOString()
    };
  }

  static async delete(id) {
    await this._delay();
    return { success: true };
  }

  static async _delay() {
    return new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 500));
  }

  static _getMockData() {
    return [];
  }
}

export class Emergency extends MockEntity {
  static _getMockData() {
    return [
      {
        id: "em001",
        title: "Flood Emergency in Chennai",
        description: "Heavy rainfall has caused severe flooding in several areas of Chennai. Immediate evacuation and relief required.",
        category: "natural_disaster",
        severity: "critical",
        status: "active",
        location: "Chennai, Tamil Nadu",
        coordinates: { lat: 13.0827, lng: 80.2707 },
        contact_person: "Raj Kumar",
        contact_phone: "+91-9876543210",
        affected_people: 5000,
        resources_needed: ["boats", "medical_supplies", "food_packets"],
        created_date: "2024-10-09T10:30:00Z",
        updated_date: "2024-10-09T11:00:00Z"
      },
      {
        id: "em002", 
        title: "Building Collapse in Mumbai",
        description: "A 4-story residential building has collapsed in Dharavi. Search and rescue operations ongoing.",
        category: "accident",
        severity: "critical",
        status: "responding",
        location: "Dharavi, Mumbai",
        coordinates: { lat: 19.0760, lng: 72.8777 },
        contact_person: "Priya Sharma",
        contact_phone: "+91-9876543211",
        affected_people: 50,
        resources_needed: ["rescue_equipment", "medical_team", "ambulances"],
        created_date: "2024-10-09T08:15:00Z",
        updated_date: "2024-10-09T10:45:00Z"
      },
      {
        id: "em003",
        title: "Forest Fire in Himachal Pradesh",
        description: "Wildfire spreading rapidly near Shimla. Evacuation of nearby villages in progress.",
        category: "fire",
        severity: "high",
        status: "active", 
        location: "Shimla, Himachal Pradesh",
        coordinates: { lat: 31.1048, lng: 77.1734 },
        contact_person: "Amit Singh",
        contact_phone: "+91-9876543212",
        affected_people: 1200,
        resources_needed: ["fire_trucks", "helicopters", "temporary_shelter"],
        created_date: "2024-10-09T06:00:00Z",
        updated_date: "2024-10-09T09:30:00Z"
      },
      {
        id: "em004",
        title: "Medical Emergency - Disease Outbreak",
        description: "Suspected cholera outbreak in rural areas. Medical teams deployed for containment.",
        category: "medical",
        severity: "high",
        status: "responding",
        location: "Patna, Bihar",
        coordinates: { lat: 25.5941, lng: 85.1376 },
        contact_person: "Dr. Sunita Kumari",
        contact_phone: "+91-9876543213", 
        affected_people: 300,
        resources_needed: ["medical_supplies", "clean_water", "antibiotics"],
        created_date: "2024-10-08T14:20:00Z",
        updated_date: "2024-10-09T07:15:00Z"
      },
      {
        id: "em005",
        title: "Road Accident - Highway Pile-up",
        description: "Multiple vehicle collision on Delhi-Gurgaon highway due to fog. Multiple casualties reported.",
        category: "accident",
        severity: "medium", 
        status: "resolved",
        location: "Delhi-Gurgaon Highway",
        coordinates: { lat: 28.4595, lng: 77.0266 },
        contact_person: "Inspector Rohit Mehta",
        contact_phone: "+91-9876543214",
        affected_people: 25,
        resources_needed: ["ambulances", "traffic_management", "tow_trucks"],
        created_date: "2024-10-08T06:30:00Z", 
        updated_date: "2024-10-08T12:00:00Z"
      }
    ];
  }
}

export default Emergency;
