import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { movieAPi, type MovieResponse } from "@/api";

export const useMovie = (options?: Omit<UseQueryOptions<MovieResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<MovieResponse[]>({
        ...options,
        queryKey: ["movies"],
        queryFn: movieAPi
    })
}