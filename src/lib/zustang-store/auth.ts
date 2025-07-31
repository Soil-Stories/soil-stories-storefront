import { create } from "zustand"

export const useAuthStore = create<{
  phone: string
  setPhone: (phone: string) => void
}>((set) => ({
  phone: "",
  setPhone: (phone: string) => set({ phone }),
}))
