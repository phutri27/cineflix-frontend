import * as bookings from "@/api/user/booking-api"
import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query"

export const useGetLockedSeat = (showTimeId: string, options?: Omit<UseQueryOptions<string[], Error>, "queryKey" | "queryFn">) => {
    return useQuery({
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