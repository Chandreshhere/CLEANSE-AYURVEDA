"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, type RegisterData } from "@/services";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}

interface LoginOTPResult {
  success: boolean;
  error?: string;
  needsRegistration?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithOTP: (firebaseIdToken: string) => Promise<LoginOTPResult>;
  registerWithPhone: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  refreshAccessToken: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "cleanse_users";
const CURRENT_USER_KEY = "cleanse_current_user";
const ACCESS_TOKEN_KEY = "cleanse_access_token";
const REFRESH_TOKEN_KEY = "cleanse_refresh_token";
const GUEST_ID_KEY = "cleanse_guest_id";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Load user and tokens from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
    setIsLoading(false);
  }, []);

  const clearGuestId = () => {
    localStorage.removeItem(GUEST_ID_KEY);
  };

  const saveAuthData = (userData: User, tokens: { accessToken: string; refreshToken: string }) => {
    setUser(userData);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    clearGuestId();
  };

  const clearAuthData = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  // Local storage based auth (existing functionality)
  const getUsers = (): { email: string; password: string; name: string; id: string }[] => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: { email: string; password: string; name: string; id: string }[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Email/password login (existing functionality)
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (foundUser) {
      const loggedInUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      };
      setUser(loggedInUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  // Email/password signup (existing functionality)
  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return { success: false, error: "An account with this email already exists" };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password,
    };

    users.push(newUser);
    saveUsers(users);

    const loggedInUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    setUser(loggedInUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));

    return { success: true };
  };

  // Phone OTP login
  const loginWithOTP = async (firebaseIdToken: string): Promise<LoginOTPResult> => {
    const result = await authService.loginWithOTP(firebaseIdToken);

    if (result.success && result.data) {
      const userData: User = {
        id: result.data.user._id,
        name: `${result.data.user.firstName || ""} ${result.data.user.lastName || ""}`.trim() || "User",
        email: result.data.user.email || "",
        phone: result.data.user.phone,
        phoneVerified: result.data.user.phoneVerified,
        emailVerified: result.data.user.emailVerified,
      };

      saveAuthData(userData, {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });

      return { success: true };
    }

    return {
      success: false,
      needsRegistration: result.needsRegistration,
      error: result.error,
    };
  };

  // Phone registration
  const registerWithPhone = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    const result = await authService.register(data);

    if (result.success && result.data) {
      const userData: User = {
        id: result.data.user._id,
        name: `${result.data.user.firstName || ""} ${result.data.user.lastName || ""}`.trim() || "User",
        email: result.data.user.email || "",
        phone: result.data.user.phone,
        phoneVerified: result.data.user.phoneVerified,
        emailVerified: result.data.user.emailVerified,
      };

      saveAuthData(userData, {
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });

      return { success: true };
    }

    return { success: false, error: result.error };
  };

  // Refresh access token
  const refreshAccessToken = async (): Promise<boolean> => {
    const currentRefreshToken = refreshToken || localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!currentRefreshToken) {
      return false;
    }

    const result = await authService.refreshToken(currentRefreshToken);

    if (result.success && result.data) {
      setAccessToken(result.data.accessToken);
      setRefreshToken(result.data.refreshToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, result.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, result.data.refreshToken);
      return true;
    }

    // Refresh token expired - logout user
    clearAuthData();
    return false;
  };

  const logout = async () => {
    const currentAccessToken = accessToken || localStorage.getItem(ACCESS_TOKEN_KEY);

    if (currentAccessToken) {
      await authService.logout(currentAccessToken);
    }

    clearAuthData();
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      accessToken,
      refreshToken,
      login,
      signup,
      loginWithOTP,
      registerWithPhone,
      refreshAccessToken,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
