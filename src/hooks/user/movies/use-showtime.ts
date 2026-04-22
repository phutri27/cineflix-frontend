import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { showtimeApi } from "@/api";
import type { ShowTimeResponse, SpecificShowTimeResponse } from "@/types/user/showtime-type";

export const useGetShowTime = (movieId: string, date: string, cityId: string) => {
    const isReady = 
        Boolean(movieId) && movieId !== "undefined" &&
        Boolean(date) && date.trim() !== "" && date !== "undefined" &&
        Boolean(cityId) && cityId !== "null" && cityId !== "undefined";
    return useQuery<ShowTimeResponse[]>({
        queryKey: ["showtimes", movieId, date, cityId],
        queryFn: () => showtimeApi.showTimeApi(movieId, date, cityId),
        enabled: isReady,
        refetchOnWindowFocus: false
    })
}

export const useGetSpecificShowTime = (showTimeId: string, options?: Omit<UseQueryOptions<SpecificShowTimeResponse>, 'queryFn'|'queryKey'>) => { 
    return useQuery<SpecificShowTimeResponse>({
        ...options,
        queryKey: ["specificShowtime", showTimeId],
        queryFn: () => showtimeApi.getSpecificShowTimeApi(showTimeId),
        refetchOnWindowFocus: false
    })
}