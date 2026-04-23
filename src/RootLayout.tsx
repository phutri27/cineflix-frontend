import { useEffect } from 'react'
import { socket } from './utils/socket-instance'
import { useUserStore } from './hooks'
import { Outlet } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

export default function RootLayout(){
    const userId = useUserStore.useUserRoleStore((state) => state.id)
    const queryClient = useQueryClient()
    useEffect(() => {
        if (!userId) return

        socket.emit("join-room", userId)
        const handlePaymentSuccess = () => {
            queryClient.invalidateQueries({queryKey: ["booking_history", userId]})
            queryClient.invalidateQueries({queryKey: ["notifications", userId]})
            queryClient.invalidateQueries({queryKey: ["profile", userId]})
            queryClient.invalidateQueries({queryKey: ["profile_voucher", userId]})       
        }
        socket.on("PAYMENT_SUCCESS", handlePaymentSuccess)

        return () => {
            socket.emit("leave-room", userId)
            socket.off("PAYMENT_SUCCESS")
        }
    }, [queryClient])

    return (
        <Outlet />
    )
}