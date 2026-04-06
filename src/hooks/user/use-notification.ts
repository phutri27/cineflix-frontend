import { getNotifications, updateNotificationStatus, deleteNotification, getNotificationsByPage, type Notification } from "@/api/user/notification-api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useNotifications = (userId: string, page: number) => {
    return useQuery({
        queryKey: ["notifications", userId, page],
        queryFn: () => getNotifications(page),
        refetchOnWindowFocus: false,
    })
}

export const useGetNotificationsByPage = (userId: string, page: number) => {
    return useQuery({
        queryKey: ["notifications-pagination", userId, page],
        queryFn: () => getNotificationsByPage(page),
        refetchOnWindowFocus: false,
    })
}   

export const useUpdateNotificationStatus = (userId: string, page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateNotificationStatus,
        onMutate: async (notiId) => {
            await queryClient.cancelQueries({ queryKey: ['notifications', userId, page] })
            const previousNotis = queryClient.getQueryData(['notifications', userId, page])
            queryClient.setQueryData<Notification[]>(['notifications', userId, page], (old) => {
                if (!old) return []
                return old.map((noti) => {
                    if (noti.id === notiId) {
                        return { ...noti, readStatus: true }
                    }
                    return noti
                })
            })
            return { previousNotis }
        },
        onError: (err, notiId, onMutateResult) => {
            queryClient.setQueryData(['notifications', userId, page], onMutateResult!.previousNotis)
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ['notifications', userId, page] }),
    })
}

export const useDeleteNotification = (userId: string, page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteNotification,
        onMutate: async (notiId) => {
            await queryClient.cancelQueries({ queryKey: ['notifications', userId, page] })
            const previousNotis = queryClient.getQueryData(['notifications', userId, page])
            queryClient.setQueryData<Notification[]>(['notifications', userId, page], (old) => {
                if (!old) return []
                return old.filter((noti) => noti.id !== notiId)
            })
            return { previousNotis }
        },
        onError: (err, notiId, onMutateResult) => {
            queryClient.setQueryData(['notifications', userId, page], onMutateResult!.previousNotis)
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ['notifications', userId, page] }),
    })
}