// Resource Entity - Mock implementation for demo purposes

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

export class Resource extends MockEntity {
  static _getMockData() {
    return [
      {
        id: "res001",
        name: "Emergency Medical Kits",
        description: "Complete first aid kits with bandages, antiseptics, and basic medicines.",
        category: "medical_supplies",
        quantity: 500,
        unit: "kits",
        location: "Red Cross Warehouse, Delhi",
        coordinates: { lat: 28.6139, lng: 77.2090 },
        provider_ngo: "Indian Red Cross Society",
        availability: "available",
        emergency_ids: [],
        specifications: {
          contents: ["bandages", "antiseptic", "pain_relievers", "thermometer"],
          expiry_date: "2025-12-31",
          weight: "2kg per kit"
        },
        created_date: "2024-09-15T10:00:00Z",
        updated_date: "2024-10-09T08:00:00Z"
      },
      {
        id: "res002", 
        name: "Rescue Boats",
        description: "Inflatable rescue boats suitable for flood relief operations.",
        category: "transportation",
        quantity: 25,
        unit: "boats",
        location: "Coast Guard Station, Chennai",
        coordinates: { lat: 13.0827, lng: 80.2707 },
        provider_ngo: "Rapid Response Team India",
        availability: "deployed",
        emergency_ids: ["em001"],
        specifications: {
          capacity: "8 people per boat",
          material: "reinforced rubber",
          motor: "outboard 15HP"
        },
        created_date: "2024-08-20T14:30:00Z",
        updated_date: "2024-10-09T09:30:00Z"
      },
      {
        id: "res003",
        name: "Food Relief Packets",
        description: "Ready-to-eat meals for disaster-affected families.",
        category: "food_water",
        quantity: 10000,
        unit: "packets",
        location: "Akshaya Patra Kitchen, Bengaluru",
        coordinates: { lat: 12.9716, lng: 77.5946 },
        provider_ngo: "Akshaya Patra Foundation", 
        availability: "available",
        emergency_ids: [],
        specifications: {
          contents: ["rice", "dal", "vegetables", "water"],
          serves: "family of 4",
          shelf_life: "3 days"
        },
        created_date: "2024-10-08T12:00:00Z",
        updated_date: "2024-10-09T06:00:00Z"
      },
      {
        id: "res004",
        name: "Temporary Shelters",
        description: "Waterproof tents for emergency accommodation.",
        category: "shelter_materials", 
        quantity: 100,
        unit: "tents",
        location: "Disaster Relief Center, Patna",
        coordinates: { lat: 25.5941, lng: 85.1376 },
        provider_ngo: "Goonj",
        availability: "reserved",
        emergency_ids: ["em003"],
        specifications: {
          capacity: "6 people per tent",
          material: "waterproof canvas",
          setup_time: "15 minutes"
        },
        created_date: "2024-09-25T09:15:00Z",
        updated_date: "2024-10-08T16:45:00Z"
      },
      {
        id: "res005",
        name: "Water Purification Tablets", 
        description: "Tablets for making contaminated water safe to drink.",
        category: "medical_supplies",
        quantity: 50000,
        unit: "tablets",
        location: "Health Department Storage, Mumbai",
        coordinates: { lat: 19.0760, lng: 72.8777 },
        provider_ngo: "Doctors Without Borders India",
        availability: "available",
        emergency_ids: [],
        specifications: {
          treatment: "1 tablet per 1 liter water",
          effectiveness: "kills 99.9% bacteria and viruses",
          shelf_life: "5 years"
        },
        created_date: "2024-07-10T11:30:00Z",
        updated_date: "2024-10-07T14:20:00Z"
      },
      {
        id: "res006",
        name: "Ambulances",
        description: "Fully equipped ambulances for medical emergencies.",
        category: "transportation",
        quantity: 12,
        unit: "vehicles",
        location: "Central Hospital, Delhi", 
        coordinates: { lat: 28.6139, lng: 77.2090 },
        provider_ngo: "Doctors Without Borders India",
        availability: "available", 
        emergency_ids: [],
        specifications: {
          equipment: ["ventilator", "defibrillator", "stretcher", "oxygen"],
          crew: "driver + paramedic",
          range: "200km on full tank"
        },
        created_date: "2024-06-05T08:45:00Z",
        updated_date: "2024-10-09T07:30:00Z"
      }
    ];
  }
}

export default Resource;
