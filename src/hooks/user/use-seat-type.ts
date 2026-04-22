import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { SeatTypeDetail } from "@/types/user/seatType-type";
import { seatTypeApi } from "@/api";

export const useGetSeatType = (cinemaId: string, options?: Omit<UseQueryOptions<SeatTypeDetail[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["seat-type", cinemaId],
        queryFn: () => seatTypeApi.getSeatType(cinemaId),
        refetchOnWindowFocus: false
    })
}