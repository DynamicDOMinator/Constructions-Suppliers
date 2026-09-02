"use client";
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";

const AuthContext = createContext({});

const formatErrorMessage = (msg) => {
  if (typeof msg !== "string") return String(msg);
  if (msg.includes("The email has already been taken")) {
    return "البريد الإلكتروني مستخدم بالفعل.";
  }
  if (msg.includes("The phone has already been taken")) {
    return "رقم الهاتف مستخدم بالفعل.";
  }
  return msg;
};

const extractAuthError = (error, defaultMsg = "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.") => {
  const resData = error.response?.data;
  if (!resData) return error.message || defaultMsg;

  if (typeof resData === "string") return formatErrorMessage(resData);

  // 1. Check nested errors object (standard Laravel validation)
  if (resData.errors && typeof resData.errors === "object") {
    const firstKey = Object.keys(resData.errors)[0];
    if (firstKey) {
      const firstVal = resData.errors[firstKey];
      const msg = Array.isArray(firstVal) ? firstVal[0] : String(firstVal);
      if (msg) return formatErrorMessage(msg);
    }
  }

  // 2. Check direct object keys (e.g. {"email": ["The email has already been taken."]})
  if (typeof resData === "object") {
    for (const key of Object.keys(resData)) {
      if (key === "message" || key === "status" || key === "success") continue;
      const val = resData[key];
      if (Array.isArray(val) && val.length > 0) {
        return formatErrorMessage(val[0]);
      }
      if (typeof val === "string" && val.length > 0) {
        return formatErrorMessage(val);
      }
    }
  }

  if (resData.message) return formatErrorMessage(resData.message);
  if (resData.error) return formatErrorMessage(resData.error);

  return defaultMsg;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    checkAuth();
  }, []);

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
        error: extractAuthError(error, "فشل تسجيل الدخول. يرجى التحقق من بياناتك.")
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
        error: extractAuthError(error, "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.")
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
