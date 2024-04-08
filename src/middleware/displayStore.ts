import axios from "axios";
import { create } from "zustand";

export interface DisplayInfo {
  id: number;
  userId: string;
  Gasoline91: string;
  Gasoline95: string;
  Diesel: string;
  displayName: string;
  displayId: string;
  isActive?: boolean;
  createdAt?: string;
}

interface DisplayStore {
  displays: DisplayInfo[];
  setDisplays: (userId: string) => Promise<void>;
  addDisplay: (display: DisplayInfo) => void;
  removeDisplay: (displayID: string) => void;
  updateDisplay: (updatedDisplay: DisplayInfo) => void;
}

const useDisplaysStore = create<DisplayStore>((set) => ({
  displays: [],
  setDisplays: async (userId) => {
    try {
      const response = await axios.post<DisplayInfo[]>("/api/displays", {
        userId,
      });
      set({ displays: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  addDisplay: (display) =>
    set((state) => ({ displays: [...state.displays, display] })),

  removeDisplay: (displayID) =>
    set((state) => ({
      displays: state.displays.filter(
        (display) => display.id !== parseInt(displayID)
      ),
    })),
  updateDisplay: (updatedDisplay) =>
    set((state) => ({
      displays: state.displays.map((display) =>
        display.id === updatedDisplay.id ? updatedDisplay : display
      ),
    })),
}));

export default useDisplaysStore;
