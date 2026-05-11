import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Auth State
  user: null,
  token: localStorage.getItem('token') || null,
  
  login: (userData, tokenData) => {
    localStorage.setItem('token', tokenData);
    set({ user: userData, token: tokenData });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  setUser: (userData) => set({ user: userData }),

  // UI State
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  theme: 'light',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),
}));
