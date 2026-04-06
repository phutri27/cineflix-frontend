import { expireSeatPayment, getLockedSeat } from "@/api/user/seat-api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useExpireSeatPayment = (sessionId: string) => {
    return useQuery({
        queryKey: ["expireSeatPayment", sessionId],
        queryFn: () => expireSeatPayment(sessionId),
        enabled: false
    })
}

export const useGetLockedSeat = (showTimeId: string, options?: Omit<UseQueryOptions<string[], Error>, "queryKey" | "queryFn">) => {
    return useQuery({
        refetchOnWindowFocus:false,
        queryKey: ["lockedSeats", showTimeId],
        queryFn: () => getLockedSeat(showTimeId),
        ...options
    })
}