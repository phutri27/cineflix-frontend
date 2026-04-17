import * as profiles from "@/api/user/profile-api"
import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query"
export const useGetProfile = (userId: string, options?: Omit<UseQueryOptions<profiles.ProfileProps>, "queryKey" | "queryFn">) => {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: profiles.getProfile,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000 * 60,  
        gcTime: 60 * 1000 * 70,
        ...options
    })
}

export const useGetBookingHistory = (page: number, userId: string, options?: Omit<UseQueryOptions<profiles.BookingHistoryProps>, "queryKey" | "queryFn">) => {
    return useQuery({
        queryKey: ["booking_history", userId, page],
        queryFn: () => profiles.getProfileBookingHistory(page),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000 * 60,
        gcTime: 60 * 1000 * 70,
        ...options
    })
}

export const useUpdateProfile = (userId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: profiles.updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", userId] })
        }
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: profiles.changePassword
    })
}   

export const useConfirmChangePasswordOTP = () => {
    return useMutation({
        mutationFn: profiles.confirmChangePasswordOTP
    })
}

export const useNewPassword = () => {
    return useMutation({
        mutationFn: profiles.newPassword
    })
}

export const useInsertProfileVoucher = () => {
    return useMutation({
        mutationFn: profiles.insertVoucher
    })
}
