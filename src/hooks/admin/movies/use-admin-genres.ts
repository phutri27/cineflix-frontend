import {useQuery, useMutation, type UseQueryOptions} from "@tanstack/react-query"
import { type GenreResponse, getGenresAdmin, insertGenreAdmin, updateGenreAdmin, deleteGenreAdmin } from "@/api"

export const useGetGenresAdmin = (options?: Omit<UseQueryOptions<GenreResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<GenreResponse[]>({
        ...options,
        queryKey: ["admin_genres"],
        queryFn: getGenresAdmin
    })
}

export const useInsertGenreAdmin = () => {
    return useMutation({
        mutationFn: insertGenreAdmin,
    })
}

export const useUpdateGenreAdmin = () => {
    return useMutation({
        mutationFn: updateGenreAdmin
    })
}

export const useDeleteGenreAdmin = () => {
    return useMutation({
        mutationFn: deleteGenreAdmin
    })
}