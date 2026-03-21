import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { movieAPi, getSpecificMovie } from "@/api/user/movie-api";
import { type MovieResponse } from "@/api/admin/types/movie-response";

export const useMovie = (status?: string, title?: string, genre?: string, options?: Omit<UseQueryOptions<MovieResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<MovieResponse[]>({
        ...options,
        queryKey: ["movies"],
        queryFn: () => movieAPi(status, title, genre),
        
    })
}

export const useSpecificMovie = (id: string, options?: Omit<UseQueryOptions<MovieResponse>, 'queryKey' | 'queryFn'>) => {
    return useQuery<MovieResponse>({
        ...options,
        queryKey: ["movies", id],
        queryFn: () => getSpecificMovie(id)
    })
}