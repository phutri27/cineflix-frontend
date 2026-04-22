import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = {
    id: string
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

type Action = {
    setUser: (user: State) => void;
    setFirstName: (first_name: string) => void;
    setLastName: (last_name: string) => void;
    clearUser: () => void;
}

export const useUserRoleStore = create<State & Action>()(
    persist(
        (set) => ({
            id: "",
            first_name: "",
            last_name: "",
            email: "",
            role: "",
            setUser: (user) => set(() => ({...user})),
            setFirstName: (first_name) => set(() => ({first_name})),
            setLastName: (last_name) => set(() => ({last_name})),
            clearUser: () => set(() => ({id: "", first_name: "", last_name: "", email: "", role: ""}))
        }),
        {
            name: "user-role-store",
            storage: createJSONStorage(() => localStorage)
        }
    ))