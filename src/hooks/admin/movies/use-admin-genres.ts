import {useQuery, useMutation, type UseQueryOptions, useQueryClient} from "@tanstack/react-query"
import type { GenreResponse } from "@/types/admin/movies/genres-type"
import { adminGenreApi } from "@/api"
export const useGetGenresAdmin = (options?: Omit<UseQueryOptions<GenreResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<GenreResponse[]>({
        ...options,
        queryKey: ["admin_genres"],
        queryFn: adminGenreApi.getGenresAdmin,
        refetchOnWindowFocus: false
    })
}

export const useInsertGenreAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminGenreApi.insertGenreAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_genres"] })
        }
    })
}

export const useUpdateGenreAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminGenreApi.updateGenreAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_genres"] })
        }
    })
}

export const useDeleteGenreAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminGenreApi.deleteGenreAdmin,
        onMutate: async (genreId) => {
            await queryClient.cancelQueries({ queryKey: ['admin_genres'] })
            const previousGenres = queryClient.getQueryData(['admin_genres'])
            queryClient.setQueryData<GenreResponse[]>(['admin_genres'], (old) => {
                if (!old) return []
                return old.filter((genre) => genre.id !== genreId)
            })
            return { previousGenres }
        },
        onError: (err, genreId, onMutateResult) => {
            queryClient.setQueryData(['admin_genres'], onMutateResult!.previousGenres)
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ['admin_genres'] }),
    })
}