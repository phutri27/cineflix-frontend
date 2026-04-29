import axiosClient from "../axios-client";
import type { BookingData } from "@/types/user/booking-type";

interface VnPayCheckoutResponse {
    success: boolean
    paymentUrl: string
    bookingId: string
}

export const getVnpayUrl = async (): Promise<{success: boolean}> => {
    const response = await axiosClient.get("/api/payment/vnpay-return")
    return response.data
}

export const createCheckoutSession = async (datas: BookingData): Promise<{redirectUrl: string, bookingId: string}> => {
    const response = await axiosClient.post("/api/payment/create-checkout-session", {datas})
    return response.data
}

export const createVnpayCheckoutSession = async (datas: BookingData): Promise<VnPayCheckoutResponse> => {
    const response = await axiosClient.post("/api/payment/vnpay-checkout", {datas})
    return response.data
}

export const cancelStripeCheckoutSesison = async (sessionId: string) => {
    const response = await axiosClient.delete(`/api/payment/${sessionId}`)
    return response.data
}