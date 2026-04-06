import { useNotifications, useUpdateNotificationStatus, useDeleteNotification, useGetNotificationsByPage } from "@/hooks/user/use-notification";
import { useUserRoleStore } from "@/utils/user-role-store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { type Notification } from "@/api/user/notification-api";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL)
export default function Notification(){
    const [pageNumber, setPageNumber] = useState<number>(1)

    const queryClient = useQueryClient()
    const { id: userId } = useUserRoleStore()
    const { data: notifications, isLoading: notiLoading } = useNotifications(userId, pageNumber)
    const { data: paginationData, isLoading: pagiLodaing } = useGetNotificationsByPage(userId, pageNumber)
    const { mutate: updateNoti } = useUpdateNotificationStatus(userId, pageNumber)
    const { mutate: deleteNoti } = useDeleteNotification(userId, pageNumber)
    console.log(paginationData)

    const handleUpdate = (id: string) => {
        updateNoti(id)
    }

    const handleDelete = (id: string) => {
        deleteNoti(id)
    }

    useEffect(() => {
        socket.emit("join-room", userId)
        const handleNewNotification = (noti: Notification) => {
            queryClient.setQueryData(["notifications", userId, pageNumber], (oldData: Notification[] | undefined) => {
                if (oldData) {
                    return [...oldData, noti]
                } else {
                    return [noti]
                }
            })
        }

        const handleUpdateNotification = (notiId: string) => {
            queryClient.setQueryData(["notifications", userId, pageNumber], (oldData: Notification[] | undefined) => {
                if (oldData) {
                    return oldData.map((n) => n.id === notiId ? { ...n, readStatus: true } : n)
                }
            })
        }

        const handleDeleteNotification = (notiId: string) => {
            queryClient.setQueryData(["notifications", userId, pageNumber], (oldData: Notification[] | undefined) => {
                if (oldData) {
                    return oldData.filter((n) => n.id !== notiId)
                }
            })
        }

        socket.on("update-notification", handleUpdateNotification)
        socket.on("new-notification", handleNewNotification)
        socket.on("delete-notification", handleDeleteNotification)

        return () => {
            socket.off("new-notification", handleNewNotification)
            socket.off("update-notification", handleUpdateNotification)
            socket.off("delete-notification", handleDeleteNotification)
            socket.emit("leave-room", userId)
        }

    }, [userId, queryClient, pageNumber])

    if (notiLoading || pagiLodaing) return <p>Loading...</p>

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            {notifications && notifications.length > 0 ? (
                <>
                <ul>
                    {notifications.map((noti) => (
                        <li key={noti.id} className={`p-3 mb-2 rounded ${noti.readStatus ? 'bg-gray-200' : 'bg-blue-100'}`}>
                            <div  onClick={() => handleUpdate(noti.id)}>
                                <h3 className="font-bold">{noti.title}</h3>
                                <p>{noti.content}</p>
                                <span className="text-sm text-gray-500">{new Date(noti.createdAt).toLocaleString()}</span>
                            </div>
                            <button onClick={() => handleDelete(noti.id)}>X</button>
                        </li>
                    ))}
                </ul>
                {paginationData && (
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: paginationData.totalPages}, (_, index) => (
                            <button 
                            key={index + 1} 
                            onClick={() => setPageNumber(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div> 
                )}
                </>
            ) : (
                <p>No notifications.</p>
            )}
        </div>
    )
}