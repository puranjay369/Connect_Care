// Volunteer Entity - Mock implementation for demo purposes

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

export class Volunteer extends MockEntity {
  static _getMockData() {
    return [
      {
        id: "vol001",
        full_name: "Arjun Sharma",
        email: "arjun.sharma@email.com",
        phone: "+91-9876543230",
        location: "Delhi, Delhi",
        coordinates: { lat: 28.6139, lng: 77.2090 },
        skills: ["first_aid", "rescue_operations", "coordination"],
        experience_level: "advanced",
        availability_status: "available",
        emergency_assignments: [],
        certifications: ["Basic Life Support", "Disaster Management"],
        languages: ["Hindi", "English", "Punjabi"],
        age: 28,
        gender: "male",
        created_date: "2024-01-15T10:30:00Z",
        updated_date: "2024-10-09T08:00:00Z"
      },
      {
        id: "vol002",
        full_name: "Priya Nair",
        email: "priya.nair@email.com", 
        phone: "+91-9876543231",
        location: "Chennai, Tamil Nadu",
        coordinates: { lat: 13.0827, lng: 80.2707 },
        skills: ["medical_assistance", "counseling", "translation"],
        experience_level: "expert",
        availability_status: "busy",
        emergency_assignments: ["em001"],
        certifications: ["Nursing", "Psychological First Aid", "CPR"],
        languages: ["Tamil", "English", "Malayalam"],
        age: 32,
        gender: "female",
        created_date: "2023-11-20T14:15:00Z",
        updated_date: "2024-10-09T09:30:00Z"
      },
      {
        id: "vol003",
        full_name: "Rahul Patel",
        email: "rahul.patel@email.com",
        phone: "+91-9876543232", 
        location: "Mumbai, Maharashtra",
        coordinates: { lat: 19.0760, lng: 72.8777 },
        skills: ["logistics", "transportation", "crowd_management"],
        experience_level: "intermediate",
        availability_status: "available",
        emergency_assignments: [],
        certifications: ["Commercial Driving License", "Event Management"],
        languages: ["Gujarati", "Hindi", "English"],
        age: 35,
        gender: "male",
        created_date: "2024-03-08T09:45:00Z",
        updated_date: "2024-10-08T17:20:00Z"
      },
      {
        id: "vol004",
        full_name: "Kavya Reddy",
        email: "kavya.reddy@email.com",
        phone: "+91-9876543233",
        location: "Bengaluru, Karnataka", 
        coordinates: { lat: 12.9716, lng: 77.5946 },
        skills: ["communication", "social_media", "data_entry"],
        experience_level: "beginner",
        availability_status: "available",
        emergency_assignments: [],
        certifications: ["Digital Marketing", "Computer Skills"],
        languages: ["Kannada", "Telugu", "English"],
        age: 24,
        gender: "female",
        created_date: "2024-05-12T16:30:00Z",
        updated_date: "2024-10-09T11:15:00Z"
      },
      {
        id: "vol005",
        full_name: "Vikram Singh",
        email: "vikram.singh@email.com",
        phone: "+91-9876543234",
        location: "Patna, Bihar",
        coordinates: { lat: 25.5941, lng: 85.1376 },
        skills: ["search_rescue", "first_aid", "equipment_operation"],
        experience_level: "expert",
        availability_status: "busy",
        emergency_assignments: ["em002", "em004"],
        certifications: ["Advanced Rescue Techniques", "Heavy Equipment Operation"],
        languages: ["Hindi", "Bhojpuri", "English"], 
        age: 40,
        gender: "male",
        created_date: "2023-08-14T12:00:00Z",
        updated_date: "2024-10-09T10:45:00Z"
      },
      {
        id: "vol006",
        full_name: "Anjali Gupta",
        email: "anjali.gupta@email.com",
        phone: "+91-9876543235",
        location: "Shimla, Himachal Pradesh",
        coordinates: { lat: 31.1048, lng: 77.1734 },
        skills: ["mountain_rescue", "medical_assistance", "weather_monitoring"],
        experience_level: "advanced",
        availability_status: "available",
        emergency_assignments: [],
        certifications: ["Mountain Rescue", "Wilderness First Aid", "Meteorology"],
        languages: ["Hindi", "Himachali", "English"],
        age: 29,
        gender: "female", 
        created_date: "2024-02-28T11:20:00Z",
        updated_date: "2024-10-09T08:50:00Z"
      }
    ];
  }
}

export default Volunteer;
