// NGO Entity - Mock implementation for demo purposes

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

export class NGO extends MockEntity {
  static _getMockData() {
    return [
      {
        id: "ngo001",
        name: "Akshaya Patra Foundation",
        description: "Providing mid-day meals to school children and emergency food relief during disasters.",
        category: "social_welfare",
        address: "Bengaluru, Karnataka",
        coordinates: { lat: 12.9716, lng: 77.5946 },
        contact_person: "Ramesh Gupta",
        contact_phone: "+91-9876543220",
        email: "contact@akshayapatra.org",
        website: "https://www.akshayapatra.org",
        verification_status: "verified",
        active_emergencies: ["em001", "em004"],
        resources_provided: ["food_packets", "clean_water", "cooking_equipment"],
        created_date: "2023-05-15T10:00:00Z",
        updated_date: "2024-10-09T08:30:00Z"
      },
      {
        id: "ngo002",
        name: "Doctors Without Borders India",
        description: "Providing emergency medical care and humanitarian aid during crises.",
        category: "healthcare",
        address: "New Delhi, Delhi",
        coordinates: { lat: 28.6139, lng: 77.2090 },
        contact_person: "Dr. Anjali Verma",
        contact_phone: "+91-9876543221",
        email: "india@msf.org", 
        website: "https://www.msf.org",
        verification_status: "verified",
        active_emergencies: ["em002", "em004"],
        resources_provided: ["medical_supplies", "ambulances", "medical_team"],
        created_date: "2022-08-20T09:15:00Z",
        updated_date: "2024-10-09T09:45:00Z"
      },
      {
        id: "ngo003",
        name: "Goonj",
        description: "Disaster relief and rural development through material donations and community participation.",
        category: "disaster_relief",
        address: "New Delhi, Delhi",
        coordinates: { lat: 28.6139, lng: 77.2090 },
        contact_person: "Anshu Gupta",
        contact_phone: "+91-9876543222",
        email: "info@goonj.org",
        website: "https://goonj.org",
        verification_status: "verified", 
        active_emergencies: ["em001", "em003"],
        resources_provided: ["clothing", "blankets", "temporary_shelter"],
        created_date: "2023-01-10T14:30:00Z",
        updated_date: "2024-10-09T07:20:00Z"
      },
      {
        id: "ngo004",
        name: "Rapid Response Team India",
        description: "Specialized in search and rescue operations during natural disasters and emergencies.",
        category: "disaster_relief",
        address: "Chennai, Tamil Nadu",
        coordinates: { lat: 13.0827, lng: 80.2707 },
        contact_person: "Captain Vikram Singh",
        contact_phone: "+91-9876543223",
        email: "response@rrtindia.org",
        website: "https://rrtindia.org",
        verification_status: "verified",
        active_emergencies: ["em001", "em002"],
        resources_provided: ["rescue_equipment", "boats", "trained_personnel"],
        created_date: "2023-03-22T11:45:00Z",
        updated_date: "2024-10-09T10:15:00Z"
      },
      {
        id: "ngo005",
        name: "Help Age India",
        description: "Focusing on elderly care and support during emergencies and disasters.",
        category: "social_welfare",
        address: "Mumbai, Maharashtra", 
        coordinates: { lat: 19.0760, lng: 72.8777 },
        contact_person: "Meera Patel",
        contact_phone: "+91-9876543224",
        email: "info@helpageindia.org",
        website: "https://www.helpageindia.org",
        verification_status: "pending",
        active_emergencies: ["em002"],
        resources_provided: ["medical_care", "counseling", "temporary_accommodation"],
        created_date: "2023-07-08T16:20:00Z",
        updated_date: "2024-10-08T15:30:00Z"
      }
    ];
  }
}

export default NGO;
