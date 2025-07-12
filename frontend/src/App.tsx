import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

// Layout import
import Layout from './components/layout/Layout';

// Page imports
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from './pages/profile/Profile';

// Main feature pages
import Marketplace from './pages/Marketplace';
import Collaboration from './pages/Collaboration';
import JamPads from './pages/JamPads';
import MusicSchools from './pages/MusicSchools';

// Footer pages
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Help from './pages/Help';

// Legacy routes for backward compatibility
import JamPadsList from './pages/jampads/JamPadsList';
import JamPadDetail from './pages/jampads/JamPadDetail';
import MusicSchoolsList from './pages/music-schools/MusicSchoolsList';
import MusicSchoolDetail from './pages/music-schools/MusicSchoolDetail';
import MarketplaceList from './pages/marketplace/MarketplaceList';
import MarketplaceDetail from './pages/marketplace/MarketplaceDetail';
import BookingsList from './pages/bookings/BookingsList';
import MessagesList from './pages/messages/MessagesList';
import UserListings from './pages/listings/UserListings';

// Context imports
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Create React Query client
const queryClient = new QueryClient();

// Protected Route wrapper component
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Auth routes without layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* All other routes with layout */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            
            {/* Main feature pages */}
            <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
            <Route path="/collaboration" element={<Layout><Collaboration /></Layout>} />
            <Route path="/jampads" element={<Layout><JamPads /></Layout>} />
            <Route path="/music-schools" element={<Layout><MusicSchools /></Layout>} />
            
            {/* Footer pages */}
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/help" element={<Layout><Help /></Layout>} />
            
            {/* Legacy routes for backward compatibility */}
            <Route path="/marketplace/:id" element={<Layout><MarketplaceDetail /></Layout>} />
            <Route path="/jampads/:id" element={<Layout><JamPadDetail /></Layout>} />
            <Route path="/music-schools/:id" element={<Layout><MusicSchoolDetail /></Layout>} />
            
            {/* Other legacy routes */}
            <Route path="/collaborations" element={<Layout><Collaboration /></Layout>} />
            
            {/* Protected routes */}
            <Route path="/profile" element={
              <Layout>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/messages" element={
              <Layout>
                <ProtectedRoute>
                  <MessagesList />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/bookings" element={
              <Layout>
                <ProtectedRoute>
                  <BookingsList />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/listings" element={
              <Layout>
                <ProtectedRoute>
                  <UserListings />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/marketplace/create" element={
              <Layout>
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              </Layout>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;