import axios from "axios";
import { create } from "zustand";

export interface FuelPrice {
  price: string;
  fuelName: string;
}

export interface FuelPricesResponse {
  prices: FuelPricesResponse | null;
  id: number;
  month: string;
  price: FuelPrice[];
  createdAt: string;
}

export interface FuelPricesState {
  data: FuelPricesResponse | null;
  fetchData: () => Promise<void>;
}

const useFuelPricesStore = create<FuelPricesState>((set) => ({
  data: null,
  fetchData: async () => {
    try {
      const response = await axios.get<FuelPricesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/fuel-prices`
      );
      set({ data: response.data });
    } catch (error) {
      console.error("Error fetching fuel prices:", error);
      throw error;
    }
  },
}));

export default useFuelPricesStore;
