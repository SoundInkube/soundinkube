import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import Index from '@/pages/Index';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import Marketplace from '@/pages/Marketplace';
import HireProfessionals from '@/pages/HireProfessionals';
import ProfessionalProfile from '@/pages/ProfessionalProfile';
import JamPads from '@/pages/JamPads';
import MusicSchools from '@/pages/MusicSchools';
import Collaboration from '@/pages/Collaboration';
import About from '@/pages/About';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Contact from '@/pages/Contact';
import Help from '@/pages/Help';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/hire-professionals" element={<HireProfessionals />} />
            <Route path="/professional/:id" element={<ProfessionalProfile />} />
            <Route path="/jampads" element={<JamPads />} />
            <Route path="/music-schools" element={<MusicSchools />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;