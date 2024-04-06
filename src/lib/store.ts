import { create } from 'zustand';

type dotVisibilityStore = {
  dotVisibility: boolean;
  setDotVisibility: (dotVisibility: boolean) => void;
};

export const useDotVisibilityStore = create<dotVisibilityStore>((set) => ({
  dotVisibility: false,
  setDotVisibility: (dotVisibility) => set({ dotVisibility }),
}));
