import { bookingApi } from "@/api"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { BookingInfoResponse } from "@/types/user/booking-type"
export const useGetBookingInfo = (bookingId: string | undefined, options?: Omit<UseQueryOptions<BookingInfoResponse>, "queryKey" | "queryFn">) => {
    return useQuery({
        refetchOnWindowFocus:false,
        queryKey: ["bookingInfo", bookingId],
        queryFn: () => bookingApi.getBookingInfo(bookingId),
        ...options
    })
}

