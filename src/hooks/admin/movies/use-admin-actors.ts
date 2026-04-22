import { useQuery, useMutation, type UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import type { ActorResponse } from "@/types/admin/movies/actors-type";
import { adminActorApi } from "@/api";

export const useGetActorsAdmin = (options?: Omit<UseQueryOptions<ActorResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ActorResponse[]>({
        ...options,
        queryKey: ["admin_actor"],
        queryFn: adminActorApi.adminGetActorsApi,
        refetchOnWindowFocus: false
    })
}

export const useInsertActorAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminActorApi.adminInsertActorApi,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["admin_actor"]})
    })
}

export const useUpdateActorAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminActorApi.adminUpdateActorApi,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["admin_actor"]})
    })
}

export const useDeleteActorAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminActorApi.adminDeleteActorApi,
        onMutate: async (deletedActorId) => {
            await queryClient.cancelQueries({ queryKey: ['admin_actor'] })
            const previousTodos = queryClient.getQueryData(['admin_actor'])
            queryClient.setQueryData<ActorResponse[]>(['admin_actor'], (old) => {
                if (!old) return []
                return old.filter((actor) => actor.id !== deletedActorId)
            })
            return { previousTodos }
        },
        onError: (err, deletedActorId, onMutateResult) => {
            queryClient.setQueryData(['admin_actor'], onMutateResult!.previousTodos)
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ['admin_actor'] }),
    })
}