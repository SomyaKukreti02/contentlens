import {create} from "zustand";

const userStore = (set) => ({
  user: null,
  authenticated: false,
  login: (data) => set({ user: data, authenticated: true }),
  logout: () => set({ user: null, authenticated: false }),
});

const useUserStore = create(userStore);

export default useUserStore;
