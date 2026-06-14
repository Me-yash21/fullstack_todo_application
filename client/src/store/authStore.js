import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create()(
  persist((set) => ({
    user: null,
    isAuthenticate: false,
    setUser: (user) => set({ user, isAuthenticate: true }),
    unsetUser: () => set({ user: null, isAuthenticate: false })
  }),
    {
      name: 'auth-store'
    }
  )
)

