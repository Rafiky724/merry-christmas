import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Familia } from "../services/familia";

interface FamiliaState {
    familia: Familia | null;
    setFamilia: (familia: Familia | null) => void;
}

export const useFamiliaStore = create<FamiliaState>()(
    persist(
        (set) => ({
            familia: null,
            setFamilia: (familia) => set({ familia }),
        }),
        { name: "familia-storage" }
    )
);
