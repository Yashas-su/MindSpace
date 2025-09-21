import React, { createContext, useContext, useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

// Create context
const ThemeContext = createContext();

// Theme configurations
const themes = {
  light: {
    colors: {
      primary: '#6366f1',
      primaryHover: '#4f46e5',
      primaryLight: '#e0e7ff',
      secondary: '#8b5cf6',
      secondaryHover: '#7c3aed',
      background: '#ffffff',
      backgroundSecondary: '#f8fafc',
      backgroundTertiary: '#f1f5f9',
      surface: '#ffffff',
      surfaceHover: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      textTertiary: '#94a3b8',
      border: '#e2e8f0',
      borderHover: '#cbd5e1',
      success: '#10b981',
      successLight: '#d1fae5',
      warning: '#f59e0b',
      warningLight: '#fef3c7',
      error: '#ef4444',
      errorLight: '#fee2e2',
      info: '#3b82f6',
      infoLight: '#dbeafe',
      shadow: 'rgba(0, 0, 0, 0.1)',
      shadowHover: 'rgba(0, 0, 0, 0.15)',
      overlay: 'rgba(0, 0, 0, 0.5)',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      gradientSecondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      gradientSuccess: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
      xxxl: '64px'
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '50%'
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '24px',
        xxxl: '32px'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75
      }
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
    },
    transitions: {
      fast: '0.15s ease',
      normal: '0.3s ease',
      slow: '0.5s ease'
    }
  },
  
  dark: {
    colors: {
      primary: '#818cf8',
      primaryHover: '#6366f1',
      primaryLight: '#312e81',
      secondary: '#a78bfa',
      secondaryHover: '#8b5cf6',
      background: '#0f172a',
      backgroundSecondary: '#1e293b',
      backgroundTertiary: '#334155',
      surface: '#1e293b',
      surfaceHover: '#334155',
      text: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      border: '#334155',
      borderHover: '#475569',
      success: '#34d399',
      successLight: '#064e3b',
      warning: '#fbbf24',
      warningLight: '#451a03',
      error: '#f87171',
      errorLight: '#7f1d1d',
      info: '#60a5fa',
      infoLight: '#1e3a8a',
      shadow: 'rgba(0, 0, 0, 0.3)',
      shadowHover: 'rgba(0, 0, 0, 0.4)',
      overlay: 'rgba(0, 0, 0, 0.7)',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      gradientSecondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      gradientSuccess: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
      xxxl: '64px'
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '50%'
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '24px',
        xxxl: '32px'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75
      }
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)'
    },
    transitions: {
      fast: '0.15s ease',
      normal: '0.3s ease',
      slow: '0.5s ease'
    }
  }
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light
    return 'light';
  });

  const [theme, setTheme] = useState(themes[themeName]);

  // Update theme when themeName changes
  useEffect(() => {
    setTheme(themes[themeName]);
    localStorage.setItem('theme', themeName);
    
    // Update document class for CSS variables
    document.documentElement.className = themeName;
  }, [themeName]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme || savedTheme === 'auto') {
        setThemeName(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setThemeName(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Set specific theme
  const setSpecificTheme = (newTheme) => {
    if (themes[newTheme]) {
      setThemeName(newTheme);
    }
  };

  const value = {
    theme,
    themeName,
    toggleTheme,
    setTheme: setSpecificTheme,
    availableThemes: Object.keys(themes)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
