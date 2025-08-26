import React, { createContext, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

// 1. Định nghĩa interface cho Context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  language: 'en' | 'vi';
  toggleLanguage: () => void;
}

// 2. Tạo Context với giá trị mặc định
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  language: 'en',
  toggleLanguage: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleLanguage = () => setLanguage(prev => (prev === 'vi' ? 'en' : 'vi'));

  const themeAlgorithm = isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, language, toggleLanguage }}>
      <ConfigProvider theme={{ algorithm: themeAlgorithm }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
