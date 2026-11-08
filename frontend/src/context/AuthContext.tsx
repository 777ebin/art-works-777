'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../lib/types';
import { fetchMe, loginUser, registerUser } from '../lib/api';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  isContributor: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('living_heritage_token');
    if (savedToken) {
      setToken(savedToken);
      fetchMe(savedToken)
        .then((profile) => setUser(profile))
        .catch(() => {
          localStorage.removeItem('living_heritage_token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await loginUser(email, pass);
    localStorage.setItem('living_heritage_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setIsAuthModalOpen(false);
  };

  const register = async (data: any) => {
    const res = await registerUser(data);
    localStorage.setItem('living_heritage_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('living_heritage_token');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'curator';
  const isContributor = ['admin', 'curator', 'contributor', 'knowledge_holder'].includes(user?.role || '');

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        isContributor,
        login,
        register,
        logout,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        isAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

