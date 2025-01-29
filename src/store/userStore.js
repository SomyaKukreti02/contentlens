import { create } from "zustand";

const userStore = (set) => ({
  user: null,
  authenticated: false,
  setUser: (data) => set({ user: data, authenticated: true }),
  unsetUser: () => set({ user: null, authenticated: false }),
});

const useUserStore = create(userStore);

export default useUserStore;
