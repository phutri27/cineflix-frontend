import * as bookings from "@/api/user/booking-api"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { BookingInfoResponse } from "@/api/user/booking-api"
export const useGetBookingInfo = (bookingId: string | undefined, options?: Omit<UseQueryOptions<BookingInfoResponse>, "queryKey" | "queryFn">) => {
    return useQuery({
        refetchOnWindowFocus:false,
        queryKey: ["bookingInfo", bookingId],
        queryFn: () => bookings.getBookingInfo(bookingId),
        ...options
    })
}

