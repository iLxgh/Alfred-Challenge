import { ThemeStore } from '@/types/themes';
import { create } from 'zustand'

const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: true, 
  toggleTheme: () => set((state) => {
    const newMode = !state.isDarkMode;
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    return { isDarkMode: newMode };
  }),
}));

export default useThemeStore;