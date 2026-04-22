import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { seatApi } from "@/api";
export const useExpireSeatPayment = (sessionId: string) => {
    return useQuery({
        queryKey: ["expireSeatPayment", sessionId],
        queryFn: () => seatApi.expireSeatPayment(sessionId),
        enabled: false
    })
}

export const useGetLockedSeat = (showTimeId: string, options?: Omit<UseQueryOptions<string[], Error>, "queryKey" | "queryFn">) => {
    return useQuery({
        refetchOnWindowFocus:false,
        queryKey: ["lockedSeats", showTimeId],
        queryFn: () => seatApi.getLockedSeat(showTimeId),
        ...options
    })
}