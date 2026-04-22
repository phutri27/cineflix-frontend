import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { MovieResponse } from "@/types/admin/movies/movie-type";
import { movieApi } from "@/api";

export const useGetMovie = (status?: string, title?: string, genre?: string, options?: Omit<UseQueryOptions<MovieResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<MovieResponse[]>({
        ...options,
        queryKey: ["movies", status],
        queryFn: () => movieApi.movieAPi(status, title, genre),
        refetchOnWindowFocus: false
    })
}

export const useSpecificMovie = (id: string, options?: Omit<UseQueryOptions<MovieResponse>, 'queryKey' | 'queryFn'>) => {
    return useQuery<MovieResponse>({
        ...options,
        queryKey: ["movies", id],
        queryFn: () => movieApi.getSpecificMovie(id),
        refetchOnWindowFocus: false
    })
}