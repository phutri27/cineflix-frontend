import { adminGetMovieApi, adminDeleteMovieApi, adminInsertMovieApi, adminUpdateMovieApi, adminGetSpecificMovie } from "@/api";
import { useQuery, useMutation, type UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import type { MovieResponse } from "@/api/admin/types/movie-response";

export const useGetMovieAdmin = (options?: Omit<UseQueryOptions<MovieResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<MovieResponse[]>({
        ...options,
        queryKey: ["admin_movies"],
        queryFn: adminGetMovieApi
    })
}

export const useGetSpecificMovieAdmin = (id: string, options?: Omit<UseQueryOptions<MovieResponse>, 'queryKey' | 'queryFn'>) => {
    return useQuery<MovieResponse>({
        ...options,
        queryKey: ["admin_movie", id],
        queryFn: () => adminGetSpecificMovie(id)
    })
}

export const useInsertMovieAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminInsertMovieApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin_movies"]})
        }
    })
}

export const useUpdateMovieAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminUpdateMovieApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin_movies"]})
        }
    })
}

export const useDeleteMovieAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminDeleteMovieApi,
        onMutate: async (deletedMovieId) => {
            await queryClient.cancelQueries({ queryKey: ['admin_movies'] })
            const previousTodos = queryClient.getQueryData(['admin_movies'])
            queryClient.setQueryData<MovieResponse[]>(['admin_movies'], (old) => {
                if (!old) return []
                return old.filter((movie) => movie.id !== deletedMovieId)
            })
            return { previousTodos }
        },
        onError: (err, deletedMovieId, onMutateResult) => {
            queryClient.setQueryData(['admin_movies'], onMutateResult!.previousTodos)
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ['admin_movies'] }),
    })
}
