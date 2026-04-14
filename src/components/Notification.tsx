import { useNotifications, useUpdateNotificationStatus, useDeleteNotification, useGetNotificationsByPage } from "@/hooks/user/use-notification";
import { useUserRoleStore } from "@/utils/user-role-store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { type Notification as NotificationType } from "@/api/user/notification-api";
import { io } from "socket.io-client";
import { X } from "lucide-react"; // Using Lucide icon for the delete button

const socket = io(import.meta.env.VITE_API_URL);

export default function Notification(){
    const [pageNumber, setPageNumber] = useState<number>(1);

    const queryClient = useQueryClient();
    const { id: userId } = useUserRoleStore();
    const { data: notifications, isLoading: notiLoading } = useNotifications(userId, pageNumber);
    const { data: paginationData, isLoading: pagiLoading } = useGetNotificationsByPage(userId, pageNumber);
    const { mutate: updateNoti } = useUpdateNotificationStatus(userId, pageNumber);
    const { mutate: deleteNoti } = useDeleteNotification(userId, pageNumber);

    // Keep all your existing socket and handler logic completely untouched...
    const handleUpdate = (id: string) => updateNoti(id);
    const handleDelete = (id: string) => deleteNoti(id);

    useEffect(() => {
        socket.emit("join-room", userId);
        const handleNewNotification = (noti: NotificationType) => {
            queryClient.setQueryData(["notifications", userId, pageNumber], (oldData: NotificationType[] | undefined) => {
                if (oldData) return [...oldData, noti];
                return [noti];
            });
        };

        const handleUpdateNotification = (notiId: string) => {
            queryClient.setQueryData(["notifications", userId, pageNumber], (oldData: NotificationType[] | undefined) => {
                if (oldData) return oldData.map((n) => n.id === notiId ? { ...n, readStatus: true } : n);
            });
        };

        const handleDeleteNotification = (notiId: string) => {
            queryClient.setQueryData(["notifications", userId, pageNumber], (oldData: NotificationType[] | undefined) => {
                if (oldData) return oldData.filter((n) => n.id !== notiId);
            });
        };

        socket.on("update-notification", handleUpdateNotification);
        socket.on("new-notification", handleNewNotification);
        socket.on("delete-notification", handleDeleteNotification);

        return () => {
            socket.off("new-notification", handleNewNotification);
            socket.off("update-notification", handleUpdateNotification);
            socket.off("delete-notification", handleDeleteNotification);
            socket.emit("leave-room", userId);
        };
    }, [userId, queryClient, pageNumber]);

    if (notiLoading || pagiLoading) {
        return <div className="p-4 text-center text-gray-400 text-sm animate-pulse">Loading notifications...</div>;
    }

    return (
        <div className="flex flex-col max-h-96">
            <div className="px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                <h2 className="text-sm font-bold tracking-widest text-gray-200 uppercase">Notifications</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {notifications && notifications.length > 0 ? (
                    <ul className="space-y-1">
                        {notifications.map((noti) => (
                            <li 
                                key={noti.id} 
                                className={`group relative p-3 rounded-md border transition-colors cursor-pointer
                                    ${noti.readStatus 
                                        ? 'bg-transparent border-transparent text-gray-500 hover:bg-gray-900' 
                                        : 'bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-800'
                                    }`}
                            >
                                <div onClick={() => handleUpdate(noti.id)} className="pr-6">
                                    <h3 className={`text-sm ${noti.readStatus ? 'font-medium' : 'font-bold text-white'}`}>
                                        {noti.title}
                                    </h3>
                                    <p className="text-xs mt-1 line-clamp-2">{noti.content}</p>
                                    <span className="text-[10px] mt-2 block opacity-70">
                                        {new Date(noti.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                
                                {/* Delete button only shows on hover for a cleaner UI */}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDelete(noti.id); }}
                                    className="absolute right-2 top-3 p-1 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-6 text-center text-sm text-gray-500">
                        No notifications right now.
                    </div>
                )}
            </div>

            {/* Pagination block */}
            {paginationData && paginationData.totalPages > 1 && (
                <div className="px-4 py-2 border-t border-gray-800 bg-gray-900/50 flex justify-center gap-1">
                    {Array.from({ length: paginationData.totalPages}, (_, index) => (
                        <button 
                            key={index + 1} 
                            onClick={() => setPageNumber(index + 1)}
                            className={`w-6 h-6 text-xs rounded flex items-center justify-center transition-colors
                                ${pageNumber === index + 1 
                                    ? 'bg-red-600 text-white' 
                                    : 'text-gray-400 hover:bg-gray-800'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div> 
            )}
        </div>
    );
}