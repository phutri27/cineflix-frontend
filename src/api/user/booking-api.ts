import axiosClient from "../axios-client";
import type { SnackData, VoucherData } from "@/pages/booking/SeatsDisplay";

export const postBooking = async ({data, seatIds}: {data: {
    movieId: string | undefined, 
    showtimeId: string, 
    totalAmount: number, 
    snacks: SnackData[]
    vouchers: VoucherData[]}, seatIds: string[]}) => {
    const response = await axiosClient.post("/api/booking", {data, seatIds})
    return response.data
}

export const updateBookingStatus = async ({bookingId, status}: {bookingId: string, status: string}) => {
    const response = await axiosClient.patch(`/api/booking/${bookingId}/status`, {status})
    return response.data
}

export const deleteBooking = async (bookingId: string) => {
    const response = await axiosClient.delete(`/api/booking/${bookingId}`)
    return response.data
}

export const getLockedSeat = async (showTimeId: string): Promise<string[]> => {
    const response = await axiosClient.get("/api/booking", {params: {showTimeId}})
    return response.data
}