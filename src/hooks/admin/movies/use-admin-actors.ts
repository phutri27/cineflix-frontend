import { type ActorResponse, adminGetActorsApi, adminInsertActorApi, adminUpdateActorApi, adminDeleteActorApi } from "@/api";
import { useQuery, useMutation, type UseQueryOptions } from "@tanstack/react-query";

export const useGetActorsAdmin = (options?: Omit<UseQueryOptions<ActorResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ActorResponse[]>({
        ...options,
        queryKey: ["admin_actor"],
        queryFn: adminGetActorsApi
    })
}

export const useInsertActorAdmin = () => {
    return useMutation({
        mutationFn: adminInsertActorApi
    })
}

export const useUpdateActorAdmin = () => {
    return useMutation({
        mutationFn: adminUpdateActorApi
    })
}

export const useDeleteActorAdmin = () => {
    return useMutation({
        mutationFn: adminDeleteActorApi
    })
}