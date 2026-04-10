import axiosClient from "../axios-client";
import type { SnackData, VoucherData } from "@/utils/booking-store";
import type { PricingDetailProp } from "@/utils/booking-store";

export interface BookingData {
    movieId: string | undefined
    showtimeId: string
    seats: PricingDetailProp[]
    snacks: SnackData[]
    vouchers: VoucherData[]
    bookingId: string
}

interface VnPayCheckoutResponse {
    success: boolean
    paymentUrl: string
    bookingId: string
}

export const getVnpayUrl = async (): Promise<{success: boolean}> => {
    const response = await axiosClient.get("/payment/vnpay-return")
    return response.data
}

export const createCheckoutSession = async (datas: BookingData): Promise<{redirectUrl: string, bookingId: string}> => {
    const response = await axiosClient.post("/payment/create-checkout-session", {datas})
    return response.data
}

export const createVnpayCheckoutSession = async (datas: BookingData): Promise<VnPayCheckoutResponse> => {
    const response = await axiosClient.post("/payment/vnpay-checkout", {datas})
    return response.data
}

export const cancelStripeCheckoutSesison = async (sessionId: string) => {
    const response = await axiosClient.delete(`/payment/${sessionId}`)
    return response.data
}