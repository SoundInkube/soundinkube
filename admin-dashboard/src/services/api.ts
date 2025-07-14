const API_BASE_URL = 'http://localhost:3001/api';

// Mock data for demonstration - this will be replaced with real API calls
const MOCK_DATA = {
  dashboardStats: {
    totalUsers: 2451,
    totalBookings: 573,
    totalProducts: 1234,
    totalRevenue: 55000,
    activeUsers: 1847,
    recentUsers: 342,
  },
  userGrowthData: [
    { month: 'Jan', total: 400, clients: 280, professionals: 120, businesses: 0 },
    { month: 'Feb', total: 600, clients: 420, professionals: 180, businesses: 0 },
    { month: 'Mar', total: 800, clients: 560, professionals: 240, businesses: 0 },
    { month: 'Apr', total: 1100, clients: 770, professionals: 330, businesses: 0 },
    { month: 'May', total: 1400, clients: 980, professionals: 420, businesses: 0 },
    { month: 'Jun', total: 1800, clients: 1260, professionals: 540, businesses: 0 },
    { month: 'Jul', total: 2100, clients: 1470, professionals: 630, businesses: 0 },
  ],
  revenueData: [
    { month: 'Jan', revenue: 12000, bookings: 80 },
    { month: 'Feb', revenue: 18000, bookings: 120 },
    { month: 'Mar', revenue: 25000, bookings: 160 },
    { month: 'Apr', revenue: 32000, bookings: 200 },
    { month: 'May', revenue: 41000, bookings: 260 },
    { month: 'Jun', revenue: 48000, bookings: 300 },
    { month: 'Jul', revenue: 55000, bookings: 350 },
  ],
  users: Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    profile: {
      firstName: ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma'][i % 6],
      lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'][i % 6],
    },
    email: `user${i + 1}@example.com`,
    role: ['CLIENT', 'MUSIC_PROFESSIONAL', 'BUSINESS_JAMPAD'][i % 3],
    isVerified: Math.random() > 0.3,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    _count: {
      bookingsAsClient: Math.floor(Math.random() * 10),
      bookingsAsProfessional: Math.floor(Math.random() * 15),
      marketListings: Math.floor(Math.random() * 5),
    },
  })),
  marketplaceItems: Array.from({ length: 30 }, (_, i) => ({
    id: `product-${i + 1}`,
    title: ['Gibson Guitar', 'Yamaha Piano', 'Roland Drums', 'Shure Microphone', 'Marshall Amp'][i % 5],
    description: 'High-quality music equipment in excellent condition.',
    price: Math.floor(Math.random() * 2000) + 100,
    condition: ['new', 'like_new', 'good', 'fair'][i % 4],
    listingType: ['INSTRUMENT', 'GEAR', 'EQUIPMENT'][i % 3],
    isAvailable: Math.random() > 0.2,
    createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    owner: {
      profile: {
        firstName: ['Alex', 'Maria', 'Chris', 'Lisa'][i % 4],
        lastName: ['Wilson', 'Davis', 'Miller', 'Moore'][i % 4],
      },
    },
  })),
  bookings: Array.from({ length: 25 }, (_, i) => ({
    id: `booking-${i + 1}`,
    title: ['Guitar Lesson', 'Vocal Coaching', 'Piano Session', 'Music Production'][i % 4],
    description: 'Professional music session booking.',
    totalPrice: Math.floor(Math.random() * 200) + 50,
    status: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'][i % 4],
    startTime: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    client: {
      profile: {
        firstName: ['Tom', 'Anna', 'Mark', 'Sophie'][i % 4],
        lastName: ['Taylor', 'Anderson', 'Thomas', 'Jackson'][i % 4],
      },
    },
    professional: {
      profile: {
        firstName: ['James', 'Emily', 'Robert', 'Jessica'][i % 4],
        lastName: ['White', 'Harris', 'Martin', 'Thompson'][i % 4],
      },
    },
  })),
  recentActivity: Array.from({ length: 10 }, (_, i) => ({
    id: `activity-${i + 1}`,
    type: ['user_registration', 'booking', 'marketplace'][i % 3],
    user: {
      name: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'][i % 4],
      email: `user${i}@example.com`,
    },
    action: [
      'Registered as music professional',
      'Booked a guitar lesson',
      'Listed equipment for sale',
      'Joined as a client',
    ][i % 4],
    time: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
  })),
  professionalCategories: [
    { name: 'Guitar Instructor', count: 145, status: 'Active', description: 'Professional guitar teachers and instructors' },
    { name: 'Vocal Coach', count: 132, status: 'Active', description: 'Professional vocal coaches and singing instructors' },
    { name: 'Piano Teacher', count: 98, status: 'Active', description: 'Professional piano instructors' },
    { name: 'Music Producer', count: 87, status: 'Active', description: 'Professional music producers and engineers' },
    { name: 'Drummer', count: 76, status: 'Active', description: 'Professional drummers and percussion instructors' },
  ],
  equipmentCategories: [
    { name: 'INSTRUMENT', count: 456, status: 'Active', description: 'Musical instruments for sale' },
    { name: 'GEAR', count: 234, status: 'Active', description: 'Music gear and accessories' },
    { name: 'EQUIPMENT', count: 187, status: 'Active', description: 'Professional audio equipment' },
    { name: 'ACCESSORY', count: 143, status: 'Active', description: 'Music accessories and parts' },
  ],
};

class ApiService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    try {
      // For now, return mock data instead of making real API calls
      // This simulates the real integration
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      return this.getMockData(endpoint);
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      throw error;
    }
  }

  private getMockData(endpoint: string) {
    const path = endpoint.replace('/api/admin/', '').replace('/api/admin', '');
    
    switch (path) {
      case 'dashboard/stats':
        return MOCK_DATA.dashboardStats;
      case 'dashboard/user-growth':
        return MOCK_DATA.userGrowthData;
      case 'dashboard/revenue':
        return MOCK_DATA.revenueData;
      case 'dashboard/activity':
        return MOCK_DATA.recentActivity;
      case 'users':
        return {
          users: MOCK_DATA.users,
          total: MOCK_DATA.users.length,
          pages: Math.ceil(MOCK_DATA.users.length / 50),
          currentPage: 1,
        };
      case 'marketplace':
        return {
          products: MOCK_DATA.marketplaceItems,
          total: MOCK_DATA.marketplaceItems.length,
          pages: Math.ceil(MOCK_DATA.marketplaceItems.length / 50),
          currentPage: 1,
        };
      case 'bookings':
        return {
          bookings: MOCK_DATA.bookings,
          total: MOCK_DATA.bookings.length,
          pages: Math.ceil(MOCK_DATA.bookings.length / 50),
          currentPage: 1,
        };
      case 'categories/professionals':
        return MOCK_DATA.professionalCategories;
      case 'categories/equipment':
        return MOCK_DATA.equipmentCategories;
      default:
        return null;
    }
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.makeRequest('/api/admin/dashboard/stats');
  }

  async getUserGrowthData() {
    return this.makeRequest('/api/admin/dashboard/user-growth');
  }

  async getRevenueData() {
    return this.makeRequest('/api/admin/dashboard/revenue');
  }

  async getRecentActivity() {
    return this.makeRequest('/api/admin/dashboard/activity');
  }

  // User management endpoints
  async getUsers(page = 1, limit = 50, role?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(role && { role }),
    });
    return this.makeRequest(`/api/admin/users?${params}`);
  }

  // Content management endpoints
  async getMarketplaceItems(page = 1, limit = 50) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.makeRequest(`/api/admin/marketplace?${params}`);
  }

  async getBookings(page = 1, limit = 50) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.makeRequest(`/api/admin/bookings?${params}`);
  }

  // Category management endpoints
  async getProfessionalCategories() {
    return this.makeRequest('/api/admin/categories/professionals');
  }

  async getEquipmentCategories() {
    return this.makeRequest('/api/admin/categories/equipment');
  }
}

export const apiService = new ApiService();