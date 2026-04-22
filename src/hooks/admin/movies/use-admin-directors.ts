import { useQuery, useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { adminDirectorApi } from "@/api";
import type { DirectorResponse } from "@/types/admin/movies/directors-type";
export const useGetDirectorsAdmin = (options?: Omit<UseQueryOptions<DirectorResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<DirectorResponse[]>({
        ...options,
        queryKey: ["admin_directors"],
        queryFn: adminDirectorApi.adminGetDirectorsApi,
        refetchOnWindowFocus: false
    })
}

export const useInsertDirectorAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminDirectorApi.adminInsertDirectorApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin_directors"]})
        }
    })
}

export const useDeleteDirectorAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminDirectorApi.adminDeleteDirectorApi,
        onMutate: async (deletedDirectorId) => {
            await queryClient.cancelQueries({ queryKey: ['admin_directors'] })
            const previousTodos = queryClient.getQueryData(['admin_directors'])
            queryClient.setQueryData<DirectorResponse[]>(['admin_directors'], (old) => {
                if (!old) return []
                return old.filter((director) => director.id !== deletedDirectorId)
            })
            return { previousTodos }
        },
        onError: (err, deletedDirectorId, onMutateResult) => {
            queryClient.setQueryData(['admin_directors'], onMutateResult!.previousTodos)
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ['admin_directors'] }),
    })
}

export const useUpdateDirectorAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminDirectorApi.adminUpdateDirectorApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin_directors"]})
        }
    })
}