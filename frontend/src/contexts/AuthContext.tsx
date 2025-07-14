import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  role?: 'music_professional' | 'client' | 'artist_manager' | 'record_label';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    username: 'Demo Label User',
    email: 'demo@recordlabel.com',
    role: 'record_label',
  });

  const login = async (email: string, password: string) => {
    setUser({
      username: 'Demo Label User',
      email: email,
      role: 'record_label',
    });
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
