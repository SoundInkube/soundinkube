import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BusinessDashboard from './pages/business/BusinessDashboard';
import ManageArtists from './pages/profile/ManageArtists';
import RevenueAnalytics from './pages/profile/RevenueAnalytics';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/manage-artists" element={<ManageArtists />} />
            <Route path="/revenue-analytics" element={<RevenueAnalytics />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
