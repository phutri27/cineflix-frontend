import * as bookings from "@/api/user/booking-api"
import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { BookingInfoResponse } from "@/api/user/booking-api"
export const useGetBookingInfo = (bookingId: string | undefined, options?: Omit<UseQueryOptions<BookingInfoResponse>, "queryKey" | "queryFn">) => {
    return useQuery({
        refetchOnWindowFocus:false,
        queryKey: ["bookingInfo", bookingId],
        queryFn: () => bookings.getBookingInfo(bookingId),
        ...options
    })
}
export const useGetLockedSeat = (showTimeId: string, options?: Omit<UseQueryOptions<string[], Error>, "queryKey" | "queryFn">) => {
    return useQuery({
        refetchOnWindowFocus:false,
        queryKey: ["lockedSeats", showTimeId],
        queryFn: () => bookings.getLockedSeat(showTimeId),
        ...options
    })
}
export const usePostBooking = () => {
    return useMutation({
        mutationFn: bookings.postBooking
    })
}

export const useUpdateBookingStatus = () => {
    return useMutation({
        mutationFn: bookings.updateBookingStatus
    })
}

export const useDeleteBooking = () => {
    return useMutation({
        mutationFn: bookings.deleteBooking
    })
}