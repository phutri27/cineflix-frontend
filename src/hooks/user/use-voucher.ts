import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { ProfileVoucher } from "@/types/user/voucher-type";
import { voucherApi } from "@/api";

export const useRedeemVoucher = () => {
    return useMutation({
        mutationFn: voucherApi.redeemVoucher
    })
} 

export const useGetProfileVoucher = (userId: string, page: number, options?: Omit<UseQueryOptions<ProfileVoucher>, 'queryFn' | 'queryKey'>) => {
    return useQuery({
        queryKey: ["profile_voucher", userId],
        queryFn: () => voucherApi.getProfileVoucher(page),
        refetchOnWindowFocus: false,
        gcTime: 60 * 1000 * 70,
        staleTime: 60 * 1000 * 60,
        ...options
    })
}

