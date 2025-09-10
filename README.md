# ConnectCare - Emergency Response Dashboard

A comprehensive emergency response coordination platform built with React, providing real-time monitoring and management of emergencies, NGOs, resources, and volunteers.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Easy Start (Windows)**:
   ```batch
   # Just double-click the start.bat file
   start.bat
   ```

2. **Manual Setup**:
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

3. **Open the application**:
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to that URL in your browser

## 📁 Project Structure

```
ConnectCare/
├── Pages/              # Main page components (existing)
│   ├── Dashboard.jsx
│   ├── Emergencies.jsx
│   ├── NGOs.jsx
│   ├── Resources.jsx
│   └── Volunteers.jsx
├── Components/         # Reusable components (existing)
│   ├── dashboard/
│   ├── emergencies/
│   ├── ngos/
│   ├── resources/
│   └── volunteers/
├── src/               # Application source (new)
│   ├── components/    # UI components
│   ├── entities/      # Data models & API simulation
│   ├── lib/          # Utilities
│   └── utils/        # Helper functions
├── dashboard.html     # Original HTML dashboard (preserved)
├── emergencyManagement.html # Original emergency management (preserved)
└── emergencyData.js   # Original data management (preserved)
```

## ✨ Features

### 🎯 **Dashboard**
- Real-time statistics display
- Active emergency monitoring
- Resource status overview
- Recent activity feed
- Quick action buttons

### 🚨 **Emergency Management**
- Add, edit, delete emergencies
- Real-time status updates
- Severity levels (Critical, High, Medium, Low)
- Location-based tracking
- Contact information management

### 🏢 **NGO Directory**
- Verified organization listings
- Capability tracking
- Coverage area mapping
- Contact management

### 📦 **Resource Management**
- Inventory tracking
- Availability status
- Location-based distribution
- Type categorization

### 👥 **Volunteer Management**
- Skill-based matching
- Availability tracking
- Background verification
- Experience levels

## 🔧 Technical Details

### **Built With**
- **React 18** - Modern React with hooks
- **Vite** - Fast development server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible components

### **Development Features**
- **Hot Module Replacement** - Instant updates during development
- **Mock Data System** - Simulated API for development
- **Component Library** - Reusable UI components
- **Responsive Design** - Works on all devices
- **TypeScript Ready** - Can be easily converted

### **Data Management**
- **Mock Entities** - Simulated database operations
- **Local Storage** - Data persistence (from original system)
- **Real-time Updates** - Live data synchronization
- **API Simulation** - Realistic loading states

## 🎨 UI Components

The application includes a complete UI component system:
- **Cards** - Information containers with hover effects
- **Buttons** - Various styles and sizes
- **Badges** - Status indicators
- **Skeletons** - Loading states
- **Forms** - Data input components

## 📊 Data Structure

### **Emergency**
```javascript
{
  id: number,
  title: string,
  type: string,
  location: string,
  severity: 'critical' | 'high' | 'medium' | 'low',
  status: 'active' | 'responding' | 'resolved',
  affected_count: number,
  urgent_needs: string[],
  contact_info: object,
  created_date: string
}
```

### **NGO**
```javascript
{
  id: number,
  name: string,
  type: string,
  verified: boolean,
  capabilities: string[],
  coverage_areas: string[],
  contact_info: object
}
```

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🔄 Integration with Backend

When your database schema is ready:

1. **Replace Mock Data**: Update `src/entities/all.js` with real API calls
2. **Add Authentication**: Implement user login/logout
3. **Real-time Updates**: Add WebSocket connections
4. **Database Integration**: Connect to your actual database

## 📱 Browser Support

- **Chrome/Edge** - Full support
- **Firefox** - Full support  
- **Safari** - Full support
- **Mobile browsers** - Responsive design

## 🤝 Contributing

1. **Preserve Existing Files**: Don't modify existing JSX components
2. **Add New Features**: Create new components in `src/components/`
3. **Update Entities**: Modify `src/entities/all.js` for data changes
4. **Test Changes**: Always test with `npm run dev`

## 📞 Support

For issues or questions:
1. **Check Console**: Look for errors in browser developer tools
2. **Verify Node.js**: Ensure Node.js v18+ is installed
3. **Clear Cache**: Try clearing browser cache and `node_modules/`
4. **Restart Server**: Stop and restart the development server

## 🎯 Next Steps

1. **✅ Run the Application**: Use `start.bat` or `npm run dev`
2. **🔗 Database Integration**: Connect your schema when ready
3. **🎨 Customize Styling**: Modify Tailwind classes as needed
4. **📊 Add Features**: Build on the existing component structure

The application is now ready to run without modifying any of your existing JSX files!
