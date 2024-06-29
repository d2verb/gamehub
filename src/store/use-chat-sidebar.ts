import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface ChatSidebarStore {
  collapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>()(
  devtools((set) => ({
    collapsed: false,
    variant: ChatVariant.CHAT,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
    onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
  })),
);
