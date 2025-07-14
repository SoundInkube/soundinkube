import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/ProfileEdit';
import Gigs from './pages/Gigs';
import './index.css';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('soundinkube_user') || 'null');
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Public Route component (redirect if logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('soundinkube_user') || 'null');
  return !user ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/edit" element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            } />
            <Route path="/gigs" element={
              <ProtectedRoute>
                <Gigs />
              </ProtectedRoute>
            } />

            {/* Placeholder routes for navigation items */}
            <Route path="/hire-professionals" element={
              <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white mb-4">Hire Professionals</h1>
                  <p className="text-gray-400">Find and hire talented music professionals</p>
                </div>
              </div>
            } />
            <Route path="/jam-pads" element={
              <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white mb-4">JamPads</h1>
                  <p className="text-gray-400">Book recording studios and rehearsal spaces</p>
                </div>
              </div>
            } />
            <Route path="/music-schools" element={
              <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white mb-4">Music Schools</h1>
                  <p className="text-gray-400">Learn from professional music educators</p>
                </div>
              </div>
            } />
            <Route path="/marketplace" element={
              <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white mb-4">Marketplace</h1>
                  <p className="text-gray-400">Discover music opportunities and services</p>
                </div>
              </div>
            } />
            <Route path="/collaboration" element={
              <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white mb-4">Collaboration Hub</h1>
                  <p className="text-gray-400">Connect and collaborate with industry professionals</p>
                </div>
              </div>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;