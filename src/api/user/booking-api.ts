import axiosClient from "../axios-client";
import type { BookingInfoResponse } from "@/types/user/booking-type";

export const getBookingInfo = async (bookingId: string | undefined): Promise<BookingInfoResponse> => {
    const response = await axiosClient.get("/api/booking", {params: {bookingId}})
    return response.data
}
