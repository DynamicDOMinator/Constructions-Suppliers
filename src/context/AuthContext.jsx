"use client";
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/me");
      if (res.data) {
        const userData = res.data.user || res.data; // Handle wrapper if any
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { access_token, user } = res.data;
      
      localStorage.setItem("access_token", access_token);
      // The API returns 'user' as a string in the login response based on docs, we'll store it
      localStorage.setItem("user", JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "فشل تسجيل الدخول. يرجى التحقق من بياناتك." 
      };
    }
  };

  const register = async (formData) => {
    try {
      // formData is a FormData object
      const res = await api.post("/auth/register", formData);
      const { access_token, user } = res.data;
      
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى." 
      };
    }
  };

  const logout = async () => {
    try {
      try {
        await api.post("/auth/chat/offline");
      } catch (offlineErr) {
        console.error("Failed to set offline status", offlineErr);
      }
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed on server, cleaning up locally anyway:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
