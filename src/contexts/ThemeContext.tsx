import React, { createContext, useContext, useState, useEffect } from 'react';

export const lightTheme = {
  dominance: '#4B0082',
  trust: '#0077B6',
  bgPrimary: '#FAFAFA',
  bgSecondary: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  elevation: '0 2px 8px rgba(26,26,26,0.08)',
  elevationHover: '0 8px 32px rgba(26,26,26,0.12)',
  glass: 'rgba(250,250,250,0.24)',
};

export const darkTheme = {
  dominance: '#9D4EDD',
  trust: '#0096C7',
  bgPrimary: '#1A1A1A',
  bgSecondary: '#2D2D2D',
  text: '#F0F0F0',
  textSecondary: '#9CA3AF',
  border: '#374151',
  elevation: '0 0 12px #9D4EDD55',
  elevationHover: '0 0 24px #9D4EDD77',
  glass: 'rgba(45,45,45,0.24)',
};

interface ThemeContextType {
  theme: typeof lightTheme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <div style={{ 
        backgroundColor: theme.bgPrimary,
        color: theme.text,
        minHeight: '100vh',
        transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};