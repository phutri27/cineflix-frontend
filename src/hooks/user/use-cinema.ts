import { getCinemaByCity, type CinemasProps, getCinemaSpecificInfo, type CinemaSpecificProps } from "@/api/user/cinema-api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";


export const useGetCinemaByCity = (city_id: number, options?: Omit<UseQueryOptions<CinemasProps[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["cinema_city", city_id],
        queryFn: () => getCinemaByCity(city_id),
        refetchOnWindowFocus: false,
        ...options
    })
}

export const useGetCinemaSpecificInfo = (city_id: number, cinemaId: string, date: string, 
    options?: Omit<UseQueryOptions<CinemaSpecificProps>, 'queryKey' | 'queryFn'>) => {
        return useQuery({
            queryKey: ["cinema_specfiic", cinemaId, date],
            queryFn: () => getCinemaSpecificInfo(city_id, cinemaId, date),
            refetchOnWindowFocus: false,
            ...options
        })
    }