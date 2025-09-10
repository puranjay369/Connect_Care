import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Dashboard from './Pages/Dashboard'
import Emergencies from './Pages/Emergencies'
import NGOs from './Pages/NGOs'
import Resources from './Pages/Resources'
import Volunteers from './Pages/Volunteers'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emergencies" element={<Emergencies />} />
          <Route path="/ngos" element={<NGOs />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/volunteers" element={<Volunteers />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
