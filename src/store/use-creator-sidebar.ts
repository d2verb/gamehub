import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CreatorSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarStore>()(
  devtools((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
  })),
);
