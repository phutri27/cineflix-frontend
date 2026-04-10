import * as vouchers from "@/api/admin/vouchers/admin-vouchers-api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useAdminGetVouchers = () => {
    return useQuery({
        queryKey: ["admin-vouchers"],
        queryFn: vouchers.getVouchers,
        refetchOnWindowFocus: false
    })
}

export const useAdminInsertVoucher = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: vouchers.insertVoucher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-vouchers"]})
        }
    })
}

export const useAdminUpdateVoucher = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: vouchers.updateVoucher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-vouchers"]})
        }
    })
}

export const useAdminDeleteVoucher = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: vouchers.deleteVoucher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-vouchers"]})
        }
    })
}