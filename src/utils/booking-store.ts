import { create } from 'zustand'
import type { SeatTypeDetail } from '@/api'
import { persist, createJSONStorage } from 'zustand/middleware'
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
    name: string
    quantity: number
    maxUsed: number
    voucherType: string
}

type State = {
    ticketDatas: PricingDetailProp[] 
    snackQuantities: SnackData[] 
    voucherQuantity: VoucherData[] 
    isSnackVoucherScreen: boolean
    totalAmount: number
}

type Action = {
    setSeatTypePrice: (seatType: SeatTypeDetail, seatId: string, row: string, number: number) => void
    incrementSnackQuantities: (snackId: string, price: number) => void
    decrementSnackQuantites: (snackId: string) => void
    setVoucherQuantity: (voucherId: string, reduceAmount: number, name: string, maxUsed: number, voucherType: string) => void 
    setIsSnackVoucherScreen: (isVoucherScreen: boolean) => void
    clearBookingData: () => void
    setTotalAmount: (totalAmount: number) => void
    removeVoucher: (voucherId: string) => void
}

export const useBookingStore = create<State & Action>()( 
        persist((set) => ({
            seatIds: [],
            ticketDatas: [],
            snackQuantities: [],
            voucherQuantity: [],
            isSnackVoucherScreen: false,
            totalAmount: 0,
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
            setVoucherQuantity: (voucherId, reduceAmount, name, maxUsed, voucherType) => set((state) => {
                const voucherIndex = state.voucherQuantity.findIndex((voucher) => voucher.voucherId === voucherId)
                if (voucherIndex !== -1){
                    const newVouchers = [...state.voucherQuantity]
                    newVouchers[voucherIndex].quantity += 1
                    return {voucherQuantity: newVouchers}
                }
                return {voucherQuantity: [...state.voucherQuantity, {name, maxUsed, voucherId, reduceAmount, quantity: 1, voucherType}]}
            }),
            removeVoucher: (voucherId) => set((state) => {
                const newVoucher = state.voucherQuantity.filter((voucher) => voucher.voucherId !== voucherId)
                return {voucherQuantity: newVoucher}
            }),
            setIsSnackVoucherScreen: (isVoucherScreen) => set(() => ({isSnackVoucherScreen: isVoucherScreen})),
            clearBookingData: () => set(() => ({ticketDatas: [], snackQuantities: [], voucherQuantity: [], isSnackVoucherScreen: false, totalAmount: 0})),
            setTotalAmount: (totalAmount) => set(() => ({totalAmount: totalAmount}))
        }),{
            name: "picked-movie-store",
            storage: createJSONStorage(() => localStorage)
        })
    )