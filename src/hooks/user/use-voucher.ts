import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { redeemVoucher, getProfileVoucher, type ProfileVoucher } from "@/api/user/voucher-api";

export const useRedeemVoucher = () => {
    return useMutation({
        mutationFn: redeemVoucher
    })
} 

export const useGetProfileVoucher = (userId: string, page: number, options?: Omit<UseQueryOptions<ProfileVoucher>, 'queryFn' | 'queryKey'>) => {
    return useQuery({
        queryKey: ["profile_voucher", userId],
        queryFn: () => getProfileVoucher(page),
        refetchOnWindowFocus: false,
        gcTime: 60 * 1000 * 70,
        staleTime: 60 * 1000 * 60,
        ...options
    })
}

