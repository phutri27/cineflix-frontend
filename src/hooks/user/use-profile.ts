import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query"
import { profileApi } from "@/api"
import type { ProfileProps, BookingHistoryProps } from "@/types/user/profile-type"
export const useGetProfile = (userId: string, options?: Omit<UseQueryOptions<ProfileProps>, "queryKey" | "queryFn">) => {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: profileApi.getProfile,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000 * 60,  
        gcTime: 60 * 1000 * 70,
        ...options
    })
}

export const useGetBookingHistory = (page: number, userId: string, options?: Omit<UseQueryOptions<BookingHistoryProps>, "queryKey" | "queryFn">) => {
    return useQuery({
        queryKey: ["booking_history", userId, page],
        queryFn: () => profileApi.getProfileBookingHistory(page),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000 * 60,
        gcTime: 60 * 1000 * 70,
        ...options
    })
}

export const useUpdateProfile = (userId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: profileApi.updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", userId] })
        }
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: profileApi.changePassword
    })
}   

export const useConfirmChangePasswordOTP = () => {
    return useMutation({
        mutationFn: profileApi.confirmChangePasswordOTP
    })
}

export const useNewPassword = () => {
    return useMutation({
        mutationFn: profileApi.newPassword
    })
}

export const useInsertProfileVoucher = () => {
    return useMutation({
        mutationFn: profileApi.insertUserVoucher
    })
}
