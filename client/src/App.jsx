import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import DonorDashboard from './pages/Donor/DonorDashboard'
import NGODashboard from './pages/NGO/NGODashboard'
import AdminPanel from './pages/Admin/AdminPanel'
import VolunteerDashboard from './pages/Volunteer/VolunteerDashboard'
import NGODiscovery from './pages/Discovery/NGODiscovery'
import ImpactDashboard from './pages/Analytics/ImpactDashboard'
import PublicPortal from './pages/Public/PublicPortal'
import ProfileSettings from './pages/Settings/ProfileSettings'
import NGOVerification from './pages/NGO/NGOVerification'
import LiveChat from './pages/Chat/LiveChat'
import EmailTest from './pages/Notifications/EmailTest'
import DonatePage from './pages/Donor/DonatePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<PublicPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register"            element={<Register />} />
        <Route path="/donor-dashboard"     element={<DonorDashboard />} />
        <Route path="/ngo-dashboard"       element={<NGODashboard />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/admin"               element={<AdminPanel />} />
        <Route path="/discover"            element={<NGODiscovery />} />
        <Route path="/analytics"           element={<ImpactDashboard />} />
        <Route path="/settings"            element={<ProfileSettings />} />
        <Route path="/ngo-verify"          element={<NGOVerification />} />
        <Route path="/chat"                element={<LiveChat />} />
        <Route path="/email-test"          element={<EmailTest />} />
        <Route path="/donate"              element={<DonatePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App