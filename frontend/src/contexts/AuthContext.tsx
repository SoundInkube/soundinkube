import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

// Define types - aligned with backend schema
type UserRole = "CLIENT" | "ARTIST" | "STUDIO_OWNER" | "MUSIC_PROFESSIONAL" | "ARTIST_MANAGER" | "RECORD_LABEL" | "BUSINESS_JAMPAD" | "BUSINESS_MUSIC_SCHOOL" | "ADMIN";

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

import { apiService } from "@/services/api";

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
      console.log("Starting login process with backend API");
      
      // Validate input
      if (!email || !email.includes('@')) {
        throw new Error("Please enter a valid email address");
      }
      
      if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      
      // Call backend API
      const response = await apiService.login({ email, password });
      const { access_token, user: userData } = response;
      
      // Store token
      localStorage.setItem("soundinkube_token", access_token);
      setToken(access_token);

      // Decode token to get user info
      const decodedToken = jwtDecode<JwtPayload>(access_token);
      setUser({
        id: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
        isEmailVerified: decodedToken.isEmailVerified,
      });
      
      console.log("Login successful:", { email, role: decodedToken.role });
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
      console.log("Starting signup process with backend API");
      
      // Validate input
      if (!email || !email.includes('@')) {
        throw new Error("Please enter a valid email address");
      }
      
      if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      
      if (!role) {
        throw new Error("Please select an account type");
      }
      
      // Call backend API
      const response = await apiService.register({ 
        email, 
        password, 
        role,
        name: email.split('@')[0] // Use email prefix as default name
      });
      const { access_token, user: userData } = response;
      
      // Store token
      localStorage.setItem("soundinkube_token", access_token);
      setToken(access_token);

      // Decode token to get user info
      const decodedToken = jwtDecode<JwtPayload>(access_token);
      setUser({
        id: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
        isEmailVerified: decodedToken.isEmailVerified,
      });
      
      console.log("Signup successful:", { email, role: decodedToken.role });
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
      // For now, redirect to Google OAuth (to be implemented with backend)
      // This is a placeholder - in production, this would initiate OAuth flow
      throw new Error("Google authentication is not yet implemented. Please use email/password login.");
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