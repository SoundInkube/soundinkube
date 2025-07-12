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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
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
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
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
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during signup");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async (): Promise<void> => {
    // In a real implementation, this would redirect to Google OAuth
    // For now, we'll just simulate the post-redirect callback
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const clearError = (): void => {
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user,
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