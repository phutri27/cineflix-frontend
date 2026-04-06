import axiosClient from "../axios-client";
import type { SnackData, VoucherData } from "@/utils/booking-store";
import type { PricingDetailProp } from "@/utils/booking-store";

export interface BookingData {
    movieId: string | undefined
    showtimeId: string
    seats: PricingDetailProp[]
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
        id: string
        startTime: Date
        screen:{
            name: string
            cinema:{
                name: string
            }
        }
    }
    seats:{
        id: string
        row: string
        number: number
    }[]
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
