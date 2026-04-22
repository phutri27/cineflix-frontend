import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminVoucherApi } from "@/api"
export const useAdminGetVouchers = () => {
    return useQuery({
        queryKey: ["admin-vouchers"],
        queryFn: adminVoucherApi.getVouchers,
        refetchOnWindowFocus: false
    })
}

export const useAdminInsertVoucher = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminVoucherApi.insertVoucher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-vouchers"]})
        }
    })
}

export const useAdminUpdateVoucher = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminVoucherApi.updateVoucher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-vouchers"]})
        }
    })
}

export const useAdminDeleteVoucher = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminVoucherApi.deleteVoucher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-vouchers"]})
        }
    })
}