import { create } from "zustand";

type State = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

export const useToogleComments = create<State>()((set) => ({
  isActive: false,
  setIsActive: (isActive: boolean) => set({ isActive }),
}));
