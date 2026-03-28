import axiosClient from "../axios-client";
import type { SnackData, VoucherData } from "@/utils/booking-store";

export interface BookingData {
    movieId: string | undefined
    showtimeId: string
    totalAmount: number
    snacks: SnackData[]
    vouchers: VoucherData[]
}

export interface BookingInfoResponse {
    userId: string
    movie: {
        posterUrl: string
        title: string
        rated: string
    }
    showtime: {
        startTime: Date
        screen:{
            name: string
            cinema:{
                name: string
            }
        }
    }
    totalAmount: number
    vouchers: {
        voucher: {name: string, reduceAmount: number}
        quantity: number
    }[]
    snacks: {
        snack: {name: string, price: number}
        quantity: number
    }[]
}

export const getBookingInfo = async (bookingId: string | undefined): Promise<BookingInfoResponse> => {
    const response = await axiosClient.get("/api/booking", {params: {bookingId}})
    return response.data
}

export const postBooking = async ({data, seatIds}: {data: BookingData, seatIds: string[]}) => {
    const response = await axiosClient.post("/api/booking", {data, seatIds})
    return response.data
}

export const updateBookingStatus = async ({bookingId, status}: {bookingId: string, status: string}) => {
    const response = await axiosClient.patch(`/api/booking/${bookingId}/status`, {status})
    return response.data
}

export const deleteBooking = async ({bookingId, seatIds}: {bookingId: string | undefined, seatIds: string[]}) => {
    const response = await axiosClient.post(`/api/booking/${bookingId}`, {
        seatIds: seatIds
    })
    return response.data
}

export const getLockedSeat = async (showTimeId: string): Promise<string[]> => {
    const response = await axiosClient.get("/api/booking/seats", {params: {showTimeId}})
    return response.data
}