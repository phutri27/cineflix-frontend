import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getCinemaRevenue, 
    getMoviesRevenue, 
    getUsersRevenue, 
    type UserRevenueProp,
    type MovieRevenueProp, 
    type CinemaRevenueProp } from "@/api/admin/transaction/admin-transaction-api";

export const useGetCinemaRevenue = (options?: Omit<UseQueryOptions<CinemaRevenueProp[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["cinema_revenue"],
        queryFn: getCinemaRevenue,
        refetchOnWindowFocus: false,
        ...options
    })
}

export const useGetMovieRevenue = (options?: Omit<UseQueryOptions<MovieRevenueProp[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["movie_revenue"],
        queryFn: getMoviesRevenue,
        refetchOnWindowFocus: false,
        ...options
    })
}

export const useGetUserRevenue = (options?: Omit<UseQueryOptions<UserRevenueProp[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["user_revenue"],
        queryFn: getUsersRevenue,
        refetchOnWindowFocus: false,
        ...options
    })
}