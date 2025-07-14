import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface StoredUser extends User {
  password: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('soundinkube_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('soundinkube_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users: StoredUser[] = JSON.parse(localStorage.getItem('soundinkube_users') || '[]');
      const foundUser = users.find((u: StoredUser) => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      const userToLogin: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role
      };
      
      setUser(userToLogin);
      localStorage.setItem('soundinkube_user', JSON.stringify(userToLogin));
      
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string, role: string): Promise<void> => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users: StoredUser[] = JSON.parse(localStorage.getItem('soundinkube_users') || '[]');
      const existingUser = users.find((u: StoredUser) => u.email === email || u.username === username);
      
      if (existingUser) {
        throw new Error('User with this email or username already exists');
      }
      
      const newUser: StoredUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        role,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('soundinkube_users', JSON.stringify(users));
      
      const userToSet: User = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      };
      
      setUser(userToSet);
      localStorage.setItem('soundinkube_user', JSON.stringify(userToSet));
      
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('soundinkube_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};
