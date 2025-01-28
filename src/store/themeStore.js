import { create } from "zustand";
// FIXME: fix this store

const getSystemTheme = () => {
  console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
const setSystemTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const themeStore = (set) => ({
  theme: getSystemTheme(),
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      setSystemTheme(newTheme);
      return { theme: newTheme };
    });
  },
  setTheme: (data) => {
    if (["light", "dark"].includes(data)) {
      setSystemTheme(data);
      set({ theme: data });
    }
  },
});

const useThemeStore = create(themeStore);

export default useThemeStore;
