import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

// Define types
type UserRole = "CLIENT" | "MUSIC_PROFESSIONAL" | "ADMIN";

interface User {
  id: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
}

interface JwtPayload {
  sub: string; // user id
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  iat: number;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: UserRole) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock authentication for development
const createMockToken = (email: string, role: UserRole): string => {
  const payload = {
    sub: "mock-user-id-" + Date.now(),
    email,
    role,
    isEmailVerified: true,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  };
  
  // Create a mock JWT (not secure, only for development)
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payloadStr = btoa(JSON.stringify(payload));
  const signature = "mock-signature";
  
  return `${header}.${payloadStr}.${signature}`;
};

const isMockAuthEnabled = import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        setToken(storedToken);
        const decodedToken = jwtDecode<JwtPayload>(storedToken);
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token expired
          handleLogout();
          return;
        }
        
        setUser({
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role,
          isEmailVerified: decodedToken.isEmailVerified,
        });
      } catch (e) {
        console.error("Failed to decode token:", e);
        handleLogout();
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      if (isMockAuthEnabled) {
        // Mock authentication
        console.log("Using mock authentication");
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Validate mock credentials (for demo purposes)
        if (email && password.length >= 6) {
          const mockToken = createMockToken(email, "CLIENT");
          localStorage.setItem("token", mockToken);
          setToken(mockToken);

          const decodedToken = jwtDecode<JwtPayload>(mockToken);
          setUser({
            id: decodedToken.sub,
            email: decodedToken.email,
            role: decodedToken.role,
            isEmailVerified: decodedToken.isEmailVerified,
          });
        } else {
          throw new Error("Invalid credentials. Password must be at least 6 characters.");
        }
      } else {
        // Real API call
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);

        const decodedToken = jwtDecode<JwtPayload>(data.access_token);
        setUser({
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role,
          isEmailVerified: decodedToken.isEmailVerified,
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during login");
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      if (isMockAuthEnabled) {
        // Mock signup
        console.log("Using mock signup");
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Validate mock credentials
        if (email && password.length >= 6) {
          const mockToken = createMockToken(email, role);
          localStorage.setItem("token", mockToken);
          setToken(mockToken);

          const decodedToken = jwtDecode<JwtPayload>(mockToken);
          setUser({
            id: decodedToken.sub,
            email: decodedToken.email,
            role: decodedToken.role,
            isEmailVerified: decodedToken.isEmailVerified,
          });
        } else {
          throw new Error("Invalid credentials. Password must be at least 6 characters.");
        }
      } else {
        // Real API call
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${apiUrl}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, role }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Signup failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);

        const decodedToken = jwtDecode<JwtPayload>(data.access_token);
        setUser({
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role,
          isEmailVerified: decodedToken.isEmailVerified,
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during signup");
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async (): Promise<void> => {
    if (isMockAuthEnabled) {
      // Mock Google login
      const mockEmail = "user@gmail.com";
      await handleLogin(mockEmail, "mockpassword123");
    } else {
      // In a real implementation, this would redirect to Google OAuth
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      window.location.href = `${apiUrl}/auth/google`;
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setError(null);
  };

  const clearError = (): void => {
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user && !!token,
    login: handleLogin,
    signUp: handleSignUp,
    loginWithGoogle: handleLoginWithGoogle,
    logout: handleLogout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};