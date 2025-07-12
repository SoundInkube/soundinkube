import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

// Page imports
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from './pages/profile/Profile';
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
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Marketplace routes */}
            <Route path="/marketplace" element={<MarketplaceList />} />
            <Route path="/marketplace/:id" element={<MarketplaceDetail />} />
            
            {/* Jam Pads routes */}
            <Route path="/jampads" element={<JamPadsList />} />
            <Route path="/jampads/:id" element={<JamPadDetail />} />
            
            {/* Music Schools routes */}
            <Route path="/music-schools" element={<MusicSchoolsList />} />
            <Route path="/music-schools/:id" element={<MusicSchoolDetail />} />
            
            {/* Other semi-public routes */}
            <Route path="/collaborations" element={<Index />} />
            
            {/* Protected routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <MessagesList />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute>
                <BookingsList />
              </ProtectedRoute>
            } />
            <Route path="/listings" element={
              <ProtectedRoute>
                <UserListings />
              </ProtectedRoute>
            } />
            <Route path="/marketplace/create" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
