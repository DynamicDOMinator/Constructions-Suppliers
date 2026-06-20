"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isEnglish, setIsEnglish] = useState(false);

  // Initialize from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang === "en") {
      setIsEnglish(true);
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", isEnglish ? "en" : "ar");
    
    // Also update document dir and lang for base styling
    document.documentElement.dir = isEnglish ? "ltr" : "rtl";
    document.documentElement.lang = isEnglish ? "en" : "ar";
  }, [isEnglish]);

  const toggleLanguage = () => {
    setIsEnglish((prev) => !prev);
  };

  return (
    <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
