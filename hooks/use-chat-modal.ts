import { create } from "zustand";

interface useChatModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useChatModal = create<useChatModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
