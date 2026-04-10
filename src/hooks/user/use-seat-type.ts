import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getSeatType } from "@/api";
import type { SeatTypeDetail } from "@/api";

export const useGetSeatType = (cinemaId: string, options?: Omit<UseQueryOptions<SeatTypeDetail[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["seat-type", cinemaId],
        queryFn: () => getSeatType(cinemaId),
        refetchOnWindowFocus: false
    })
}