import { create } from 'zustand'
import type { SeatTypeDetail } from '@/api'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface PricingDetailProp {
    id: string
    seat_id: string
    price: string
    seat_type: string
    row: string
    number: number
}

export interface SnackData {
    snackId: string
    price: number
    quantity: number
}

export interface VoucherData {
    voucherId: string
    reduceAmount: number
    quantity: number
}

type State = {
    seatIds: {id: string, row: string, number: number}[]
    ticketDatas: PricingDetailProp[] 
    snackQuantities: SnackData[] 
    voucherQuantity: VoucherData[] 
    isSnackVoucherScreen: boolean
}

type Action = {
    setSeatIds: () => void
    setSeatTypePrice: (seatType: SeatTypeDetail, seatId: string, row: string, number: number) => void
    incrementSnackQuantities: (snackId: string, price: number) => void
    decrementSnackQuantites: (snackId: string) => void
    setVoucherQuantity: (voucherId: string, reduceAmount: number) => void 
    setIsSnackVoucherScreen: (isVoucherScreen: boolean) => void
    clearBookingData: () => void
}

export const useBookingStore = create<State & Action>()( 
    persist(
        (set) => ({
            seatIds: [],
            ticketDatas: [],
            snackQuantities: [],
            voucherQuantity: [],
            isSnackVoucherScreen: false,
            setSeatTypePrice: (seatType, seatId, row, number) => set((state) => {
                const isPickedSeat = state.ticketDatas.some((ticket) => ticket.seat_id === seatId)
                if (!isPickedSeat){
                    const newTicketData = {...seatType, seat_id: seatId, row, number} as PricingDetailProp
                    return {ticketDatas: [...state.ticketDatas, newTicketData]}
                } else {
                    return {ticketDatas: state.ticketDatas.filter((ticket) => ticket.seat_id !== seatId)}
                }
            }),
            incrementSnackQuantities: (snackId, price) => set((state) => {
                const snackIndex = state.snackQuantities.findIndex((snack) => snack.snackId === snackId)
                if (snackIndex !== -1){
                    const newQuantities = [...state.snackQuantities]
                    newQuantities[snackIndex].quantity += 1
                    return {snackQuantities: newQuantities}
                } else{
                    return {snackQuantities: [...state.snackQuantities, {snackId, price, quantity: 1}]}
                }
            }),
            decrementSnackQuantites: (snackId) => set((state) => {
                const snackIndex = state.snackQuantities.findIndex((snack) => snack.snackId === snackId)
                if (snackIndex !== -1){
                    const newQuantities = [...state.snackQuantities]
                    if (newQuantities[snackIndex].quantity > 0){
                        newQuantities[snackIndex].quantity -= 1
                        if (newQuantities[snackIndex].quantity === 0){
                            newQuantities.splice(snackIndex, 1)
                        }
                        return {snackQuantities: newQuantities}
                    }
                }
                return {snackQuantities: state.snackQuantities}
            }),
            setVoucherQuantity: (voucherId, reduceAmount) => set((state) => {
                return {voucherQuantity: [...state.voucherQuantity, {voucherId, reduceAmount, quantity: 1}]}
            }),
            setIsSnackVoucherScreen: (isVoucherScreen) => set(() => ({isSnackVoucherScreen: isVoucherScreen})),
            clearBookingData: () => set(() => ({ticketDatas: [], snackQuantities: [], voucherQuantity: [], isSnackVoucherScreen: false})),
            setSeatIds: () => set((state) => ({seatIds: state.ticketDatas.map((ticket) => ({id: ticket.seat_id, row: ticket.row, number: ticket.number}))}))
        }),
        {
            name: 'seats-id',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                seatIds: state.seatIds
            })
        }
    )
)