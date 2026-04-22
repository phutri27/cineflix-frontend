import { adminSeatTypeApi } from "@/api"
import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { SeatTypeProp } from "@/types/admin/cinema/seat-type"
export function useGetAdminSeatTypesByCinema(cinema_id: string, options?: Omit<UseQueryOptions<SeatTypeProp[]>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: ["admin_seat_types", cinema_id],
        queryFn: () => adminSeatTypeApi.getAdminSeatTypesByCinema(cinema_id),
        refetchOnWindowFocus: false,
        ...options
    })
}

export function useInsertAdminSeatType(cinema_id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminSeatTypeApi.insertAdminSeatType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-cinema", cinema_id] })
        }
    })
}

export function useUpdateAdminSeatType(cinema_id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminSeatTypeApi.updateAdminSeatType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-cinema", cinema_id] })
        }
    })
}

export function useDeleteAdminSeatType(cinema_id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminSeatTypeApi.deleteAdminSeatType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-cinema", cinema_id] })
        }
    })
}