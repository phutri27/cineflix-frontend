import axiosClient from "../axios-client";
import type { Notification, PaginatedNotifications } from "@/types/user/notifications-type";
export const getNotifications = async (page: number): Promise<Notification[]> => {
    const response = await axiosClient.get("/api/notifications", {
        params:{
            page: page,
            limit: 5
        }
    })
    return response.data.data
}

export const getUnreadNoti = async (): Promise<number> => {
    const response = await axiosClient.get("/api/notifications/unread-noti")
    return response.data
}

export const getNotificationsByPage = async (page: number): Promise<PaginatedNotifications> => {
    const response = await axiosClient.get("/api/notifications", {
        params:{
            page: page,
            limit: 5
        }
    })
    return {
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage
    }
}

export const updateNotificationStatus = async (notiId: string) => {
    await axiosClient.patch(`/api/notifications/${notiId}`)
}

export const deleteNotification = async (notiId: string)=> {
    await axiosClient.delete(`/api/notifications/${notiId}`)
}