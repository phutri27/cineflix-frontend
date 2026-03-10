import { type ActorResponse, adminGetActorsApi, adminInsertActorApi, adminUpdateActorApi, adminDeleteActorApi } from "@/api";
import { useQuery, useMutation, type UseQueryOptions } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const useGetActorsAdmin = (options?: Omit<UseQueryOptions<ActorResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ActorResponse[]>({
        ...options,
        queryKey: ["admin_actor"],
        queryFn: adminGetActorsApi
    })
}

export const useInsertActorAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminInsertActorApi,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["admin_actor"]})
    })
}

export const useUpdateActorAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminUpdateActorApi,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["admin_actor"]})
    })
}

export const useDeleteActorAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminDeleteActorApi,
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