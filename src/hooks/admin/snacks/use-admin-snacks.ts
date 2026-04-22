import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query"
import type { SnackResponse } from "@/types/admin/snacks/snacks-type"
import { adminSnackApi } from "@/api"

export const useAdminGetSnacks = (options?: Omit<UseQueryOptions<SnackResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["admin-snacks"],
        queryFn: adminSnackApi.getSnacks,
        refetchOnWindowFocus: false
    })
}

export const useAdminCreateSnack = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminSnackApi.createSnack,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-snacks"] })
        }
    })
}

export const useAdminUpdateSnack = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminSnackApi.updateSnack,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-snacks"] })
        }
    })
}

export const useAdminDeleteSnack = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminSnackApi.deleteSnack,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-snacks"] })
        }
    })
}