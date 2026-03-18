import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

type Action = {
    setUser: (user: State) => void;
    clearUser: () => void;
}

export const useUserRoleStore = create<State & Action>()(
    persist(
        (set) => ({
            first_name: "",
            last_name: "",
            email: "",
            role: "",
            setUser: (user) => set(() => ({...user})),
            clearUser: () => set(() => ({first_name: "", last_name: "", email: "", role: ""}))
        }),
        {
            name: "user-role-store",
            storage: createJSONStorage(() => localStorage)
        }
    ))