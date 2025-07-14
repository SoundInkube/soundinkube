// API Configuration and Helper Functions
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  access_token: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: `HTTP error! status: ${response.status}` 
        }));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return await this.request<AuthResponse>('auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return await this.request<AuthResponse>('auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Add authorization header for authenticated requests
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('soundinkube_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Authenticated request helper
  async authenticatedRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    return await this.request<T>(endpoint, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });
  }

  // User profile endpoints (for future use)
  async getProfile(): Promise<any> {
    return await this.authenticatedRequest('profile');
  }

  async updateProfile(profileData: any): Promise<any> {
    return await this.authenticatedRequest('profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }
}

export const apiService = new ApiService();
export default apiService;