import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import type { Notification, PaginatedNotifications } from "@/types/user/notifications-type";
import { notificationApi } from "@/api";

export const useNotifications = (userId: string, page: number, options?: Omit<UseQueryOptions<Notification[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["notifications", userId, page],
        queryFn: () => notificationApi.getNotifications(page),
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000 * 60,
        gcTime: 60 * 1000 * 70,
        ...options
    })
}

export const useGetUnreadNoti = (userId: string, options?: Omit<UseQueryOptions<number>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["notifications", "unread-notis", userId],
        queryFn: notificationApi.getUnreadNoti,
        refetchOnWindowFocus: false,
        ...options
    })
}

export const useGetNotificationsByPage = (userId: string, page: number, options?: Omit<UseQueryOptions<PaginatedNotifications>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        queryKey: ["notifications-pagination", userId, page],
        queryFn: () => notificationApi.getNotificationsByPage(page),
        refetchOnWindowFocus: false,
        ...options
    })
}   

export const useUpdateNotificationStatus = (userId: string, page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: notificationApi.updateNotificationStatus,
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
        mutationFn: notificationApi.deleteNotification,
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