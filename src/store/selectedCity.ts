import { create } from "zustand";
import type { City } from "@/types/type";

interface SelectedCity {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
}

export const useCityStore = create<SelectedCity>((set) => ({
  selectedCity: JSON.parse(localStorage.getItem("selectedCity") || "null"),
  setSelectedCity: (city: City | null) => {
    if (city) {
      localStorage.setItem("selectedCity", JSON.stringify(city));
    } else {
      localStorage.removeItem("selectedCity");
    }
    set({ selectedCity: city });
  },
}));
