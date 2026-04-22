import { useQuery, useMutation, type UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import { adminMovieApi } from "@/api";
import type { MovieResponse } from "@/types/admin/movies/movie-type";

export const useGetMovieAdmin = (options?: Omit<UseQueryOptions<MovieResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<MovieResponse[]>({
        ...options,
        queryKey: ["admin_movies"],
        queryFn: adminMovieApi.adminGetMovieApi,
        refetchOnWindowFocus: false
    })
}

export const useGetSpecificMovieAdmin = (id: string, options?: Omit<UseQueryOptions<MovieResponse>, 'queryKey' | 'queryFn'>) => {
    return useQuery<MovieResponse>({
        ...options,
        queryKey: ["admin_movie", id],
        queryFn: () => adminMovieApi.adminGetSpecificMovie(id)
    })
}

export const useInsertMovieAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminMovieApi.adminInsertMovieApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin_movies"]})
        }
    })
}

export const useUpdateMovieAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminMovieApi.adminUpdateMovieApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin_movies"]})
        }
    })
}

export const useDeleteMovieAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminMovieApi.adminDeleteMovieApi,
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
