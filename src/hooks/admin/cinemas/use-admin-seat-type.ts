import * as seatTypes from "@/api/admin/cinema/admin-seat-type-api"
import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { type SeatTypeProp } from "@/api/admin/cinema/admin-seat-type-api"
export function useGetAdminSeatTypesByCinema(cinema_id: string, options?: Omit<UseQueryOptions<SeatTypeProp[]>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: ["admin_seat_types", cinema_id],
        queryFn: () => seatTypes.getAdminSeatTypesByCinema(cinema_id),
        ...options
    })
}

export function useInsertAdminSeatType(cinema_id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: seatTypes.insertAdminSeatType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-cinema", cinema_id] })
        }
    })
}

export function useUpdateAdminSeatType(cinema_id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: seatTypes.updateAdminSeatType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-cinema", cinema_id] })
        }
    })
}

export function useDeleteAdminSeatType(cinema_id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: seatTypes.deleteAdminSeatType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-cinema", cinema_id] })
        }
    })
}