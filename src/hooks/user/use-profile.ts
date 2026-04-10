import * as profiles from "@/api/user/profile-api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetProfile = (userId: string) => {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: profiles.getProfile,
        refetchOnWindowFocus: false
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
