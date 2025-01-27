import { create } from "zustand";

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const themeStore = (set) => ({
  theme: getSystemTheme(), // Initialize with the system's theme
  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },
  setTheme: (data) => {
    if (["light", "dark"].includes(data)) {
      set({ theme: data });
    }
  },
});

const useThemeStore = create(themeStore);

export default useThemeStore;
