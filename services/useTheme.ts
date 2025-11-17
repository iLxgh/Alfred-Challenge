import { useEffect } from 'react';
import useThemeStore from '../store/useThemeStore';

export const useTheme = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialDarkMode = savedTheme ? savedTheme === 'dark' : true;
    
    if (initialDarkMode !== isDarkMode) {
      toggleTheme();
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleTheme };
};