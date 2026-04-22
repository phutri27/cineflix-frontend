import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { CinemaRevenueProp, MovieRevenueProp,UserRevenueProp } from "@/types/admin/transaction/transaction-type";
import { adminTransactionApi } from "@/api";

export const useGetCinemaRevenue = (options?: Omit<UseQueryOptions<CinemaRevenueProp[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["cinema_revenue"],
        queryFn: adminTransactionApi.getCinemaRevenue,
        refetchOnWindowFocus: false,
        ...options
    })
}

export const useGetMovieRevenue = (options?: Omit<UseQueryOptions<MovieRevenueProp[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["movie_revenue"],
        queryFn: adminTransactionApi.getMoviesRevenue,
        refetchOnWindowFocus: false,
        ...options
    })
}

export const useGetUserRevenue = (options?: Omit<UseQueryOptions<UserRevenueProp[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["user_revenue"],
        queryFn: adminTransactionApi.getUsersRevenue,
        refetchOnWindowFocus: false,
        ...options
    })
}