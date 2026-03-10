import { create } from "zustand"

type State = {
    modalIsOpen: boolean
}

interface Action {
    openModal: () =>void
    closeModal: () => void
}

export const useModalStore = create<State & Action>((set) => ({
    modalIsOpen: false,
    openModal: () => set(() => ({modalIsOpen: true})),
    closeModal: () => set(() => ({modalIsOpen: false}))
}))