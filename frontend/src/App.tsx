import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';

// Import ALL original pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Dashboard and main pages
import Dashboard from './pages/Dashboard';
import Gigs from './pages/Gigs';
import Marketplace from './pages/Marketplace';
import JamPads from './pages/JamPads';
import MusicSchools from './pages/MusicSchools';
import FindMusicSchools from './pages/FindMusicSchools';
import HireProfessionals from './pages/HireProfessionals';
import ProfessionalProfile from './pages/ProfessionalProfile';
import Collaboration from './pages/Collaboration';
import AddProduct from './pages/AddProduct';
import ManageTalent from './pages/ManageTalent';
import ScoutArtists from './pages/ScoutArtists';

// Auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Profile pages
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/ProfileEdit';
import ProfileView from './pages/profile/ProfileView';
import ProfileSettings from './pages/profile/ProfileSettings';
import MyBookings from './pages/profile/MyBookings';
import MyCollaborations from './pages/profile/MyCollaborations';
import MyStudents from './pages/profile/MyStudents';
import SavedProfessionals from './pages/profile/SavedProfessionals';
import Analytics from './pages/profile/Analytics';
import PaymentHistory from './pages/profile/PaymentHistory';
import MyEquipmentListings from './pages/profile/MyEquipmentListings';

// Business & Label routes
import BusinessDashboard from './pages/business/BusinessDashboard';
import BusinessSetup from './pages/business/BusinessSetup';
import ManageArtists from './pages/profile/ManageArtists';
import Contracts from './pages/profile/Contracts';
import RevenueAnalytics from './pages/profile/RevenueAnalytics';

// Artist Manager pages
import ArtistManagerDashboard from './pages/artist-manager/Dashboard';
import ArtistRoster from './pages/artist-manager/ArtistRoster';
import BookingCalendar from './pages/artist-manager/BookingCalendar';
import ContractManagement from './pages/artist-manager/ContractManagement';
import RevenueTracker from './pages/artist-manager/RevenueTracker';
import AnalyticsDashboard from './pages/artist-manager/AnalyticsDashboard';
import Campaigns from './pages/artist-manager/Campaigns';
import ArtistManagerBookings from './pages/artist-manager/Bookings';
import ArtistManagerContracts from './pages/artist-manager/Contracts';
import Revenue from './pages/artist-manager/Revenue';

// Artist Management
import ArtistManager from './pages/artist-management/ArtistManager';
import MyManagers from './pages/artist-management/MyManagers';

// Marketplace pages
import MarketplaceList from './pages/marketplace/MarketplaceList';
import MarketplaceDetail from './pages/marketplace/MarketplaceDetail';

// JamPads pages
import JamPadsList from './pages/jampads/JamPadsList';
import JamPadDetail from './pages/jampads/JamPadDetail';

// Music Schools pages
import MusicSchoolsList from './pages/music-schools/MusicSchoolsList';
import MusicSchoolDetail from './pages/music-schools/MusicSchoolDetail';

// Bookings pages
import BookingsList from './pages/bookings/BookingsList';

// Messages pages
import MessagesList from './pages/messages/MessagesList';

// Listings pages
import UserListings from './pages/listings/UserListings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Main Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Dashboard and Services */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gigs" element={<Gigs />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/jam-pads" element={<JamPads />} />
            <Route path="/music-schools" element={<MusicSchools />} />
            <Route path="/find-music-schools" element={<FindMusicSchools />} />
            <Route path="/hire-professionals" element={<HireProfessionals />} />
            <Route path="/professional/:id" element={<ProfessionalProfile />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/manage-talent" element={<ManageTalent />} />
            <Route path="/scout-artists" element={<ScoutArtists />} />
            
            {/* Profile Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/profile/view/:id" element={<ProfileView />} />
            <Route path="/profile/settings" element={<ProfileSettings />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/my-collaborations" element={<MyCollaborations />} />
            <Route path="/my-students" element={<MyStudents />} />
            <Route path="/saved-professionals" element={<SavedProfessionals />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/my-equipment-listings" element={<MyEquipmentListings />} />
            
            {/* Business & Label Routes */}
            <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/business/setup" element={<BusinessSetup />} />
            <Route path="/manage-artists" element={<ManageArtists />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/revenue-analytics" element={<RevenueAnalytics />} />
            
            {/* Artist Manager Routes */}
            <Route path="/artist-manager/dashboard" element={<ArtistManagerDashboard />} />
            <Route path="/artist-manager/roster" element={<ArtistRoster />} />
            <Route path="/artist-manager/calendar" element={<BookingCalendar />} />
            <Route path="/artist-manager/contracts" element={<ContractManagement />} />
            <Route path="/artist-manager/revenue" element={<RevenueTracker />} />
            <Route path="/artist-manager/analytics" element={<AnalyticsDashboard />} />
            <Route path="/artist-manager/campaigns" element={<Campaigns />} />
            <Route path="/artist-manager/bookings" element={<ArtistManagerBookings />} />
            <Route path="/artist-manager/contracts-list" element={<ArtistManagerContracts />} />
            <Route path="/artist-manager/revenue-list" element={<Revenue />} />
            
            {/* Artist Management Routes */}
            <Route path="/artist-management/manager" element={<ArtistManager />} />
            <Route path="/artist-management/my-managers" element={<MyManagers />} />
            
            {/* Marketplace Routes */}
            <Route path="/marketplace/list" element={<MarketplaceList />} />
            <Route path="/marketplace/detail/:id" element={<MarketplaceDetail />} />
            
            {/* JamPads Routes */}
            <Route path="/jam-pads/list" element={<JamPadsList />} />
            <Route path="/jam-pads/detail/:id" element={<JamPadDetail />} />
            
            {/* Music Schools Routes */}
            <Route path="/music-schools/list" element={<MusicSchoolsList />} />
            <Route path="/music-schools/detail/:id" element={<MusicSchoolDetail />} />
            
            {/* Bookings Routes */}
            <Route path="/bookings" element={<BookingsList />} />
            
            {/* Messages Routes */}
            <Route path="/messages" element={<MessagesList />} />
            
            {/* Listings Routes */}
            <Route path="/listings" element={<UserListings />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
