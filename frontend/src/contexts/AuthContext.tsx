import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

// Define types
type UserRole = "CLIENT" | "MUSIC_PROFESSIONAL" | "ARTIST_MANAGER_LABEL" | "ADMIN";

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

// Mock authentication for development - always enabled for now
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

// Force mock authentication for development
const isMockAuthEnabled = true; // Always true for development

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("soundinkube_token");
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
      console.log("Starting login process with mock auth");
      
      // Always use mock authentication for development
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Validate mock credentials (for demo purposes)
      if (!email || !email.includes('@')) {
        throw new Error("Please enter a valid email address");
      }
      
      if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      
      // CRITICAL FIX: Check if user already has a stored profile with role
      const storedUserData = localStorage.getItem(`soundinkube_user_${email}`);
      let role: UserRole = "CLIENT";
      
      if (storedUserData) {
        // User exists - use their stored role
        const userData = JSON.parse(storedUserData);
        role = userData.role;
        console.log("Found existing user with role:", role);
      } else {
        // New user - determine role based on email domain (fallback only)
        if (email.includes('professional') || email.includes('musician')) {
          role = "MUSIC_PROFESSIONAL";
        } else if (email.includes('manager') || email.includes('label')) {
          role = "ARTIST_MANAGER_LABEL";
        }
      }
      
      const mockToken = createMockToken(email, role);
      localStorage.setItem("soundinkube_token", mockToken);
      setToken(mockToken);

      const decodedToken = jwtDecode<JwtPayload>(mockToken);
      setUser({
        id: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
        isEmailVerified: decodedToken.isEmailVerified,
      });
      
      console.log("Login successful:", { email, role });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed. Please try again.";
      setError(errorMessage);
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
      console.log("Starting signup process with mock auth");
      
      // Always use mock authentication for development
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate mock credentials
      if (!email || !email.includes('@')) {
        throw new Error("Please enter a valid email address");
      }
      
      if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      
      if (!role) {
        throw new Error("Please select an account type");
      }
      
      // CRITICAL FIX: Store user profile data persistently
      const userData = {
        email,
        role,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(`soundinkube_user_${email}`, JSON.stringify(userData));
      console.log("Stored user data:", userData);
      
      const mockToken = createMockToken(email, role);
      localStorage.setItem("soundinkube_token", mockToken);
      setToken(mockToken);

      const decodedToken = jwtDecode<JwtPayload>(mockToken);
      setUser({
        id: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
        isEmailVerified: decodedToken.isEmailVerified,
      });
      
      console.log("Signup successful:", { email, role });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Signup failed. Please try again.";
      setError(errorMessage);
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async (): Promise<void> => {
    try {
      // Mock Google login with a professional account
      const mockEmail = "professional@gmail.com";
      await handleLogin(mockEmail, "mockpassword123");
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem("soundinkube_token");
    setUser(null);
    setToken(null);
    setError(null);
    console.log("User logged out");
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