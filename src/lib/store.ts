import { create } from 'zustand';

type dotVisibilityStore = {
  dotVisibility: boolean;
  setDotVisibility: (dotVisibility: boolean) => void;
};

export const useDotVisibilityStore = create<dotVisibilityStore>((set) => ({
  dotVisibility: false,
  setDotVisibility: (dotVisibility) => set({ dotVisibility }),
}));

type logInStatusStore = {
  logInStatus: boolean;
  setLogInStatus: (logInStatus: boolean) => void;
};

export const useLogInStatusStore = create<logInStatusStore>((set) => ({
  logInStatus: false,
  setLogInStatus: (logInStatus) => set({ logInStatus }),
}));
