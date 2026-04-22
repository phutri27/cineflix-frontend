import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { CinemasProps, CinemaSpecificProps } from "@/types/user/cinema-type";
import { cinemaApi } from "@/api";

export const useGetCinemaByCity = (city_id: number, options?: Omit<UseQueryOptions<CinemasProps[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["cinema_city", city_id],
        queryFn: () => cinemaApi.getCinemaByCity(city_id),
        refetchOnWindowFocus: false,
        ...options
    })
}

export const useGetCinemaSpecificInfo = (city_id: number, cinemaId: string, date: string, 
    options?: Omit<UseQueryOptions<CinemaSpecificProps>, 'queryKey' | 'queryFn'>) => {
        console.log(options)
        return useQuery({
            queryKey: ["cinema_specfiic", cinemaId, date],
            queryFn: () => cinemaApi.getCinemaSpecificInfo(city_id, cinemaId, date),
            refetchOnWindowFocus: false,
            ...options
        })
    }