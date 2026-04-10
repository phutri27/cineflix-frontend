import * as snacks from "@/api/admin/snacks/admin-snacks-api"
import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query"

export const useAdminGetSnacks = (options?: Omit<UseQueryOptions<snacks.SnackResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["admin-snacks"],
        queryFn: snacks.getSnacks,
        refetchOnWindowFocus: false
    })
}

export const useAdminCreateSnack = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: snacks.createSnack,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-snacks"] })
        }
    })
}

export const useAdminUpdateSnack = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: snacks.updateSnack,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-snacks"] })
        }
    })
}

export const useAdminDeleteSnack = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: snacks.deleteSnack,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-snacks"] })
        }
    })
}