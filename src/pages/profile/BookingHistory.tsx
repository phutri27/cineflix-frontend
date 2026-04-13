import { useGetBookingHistory } from "@/hooks/user/use-profile"
import { useUserRoleStore } from "@/utils/user-role-store"
import { format } from "date-fns"
import { useState } from "react"
export default function BookingHistory() {
    const [page, setPage] = useState<number>(1)
    const userId = useUserRoleStore((state) => state.id)
    const { data: bookingHistory, isLoading, error } = useGetBookingHistory(page, userId)

    const handleChoosePage = (page: number) => {
        setPage(page)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h1>Booking History</h1>
            {bookingHistory?.data.map((booking) => (
                <div key={booking.id}>
                    <div>
                        <h2>{booking.showtime.movie.title}</h2>
                        <img src={booking.showtime.movie.posterUrl} alt={`${booking.showtime.movie.title}'s poster`} />
                    </div>
                    <div>
                        <h3>{booking.showtime.screen.cinema.name}</h3>
                        <p>{booking.showtime.screen.name}</p>
                        <p>{format(booking.showtime.startTime, "dd/MM/yyyy HH:mm")}</p>
                        <p>Seats: {booking.seats.map((seat) => (
                            seat.row + seat.number + ", "
                        ))}</p>
                    </div>
                    {booking.snacks.length > 0 && <div>
                        {booking.snacks.map((snack) => (
                            <div>
                                <p>{snack.quantity}</p>
                                <p>{snack.snack.name}</p>
                            </div>
                        ))}
                    </div>}
                    {booking.vouchers.length > 0 && 
                    <div>
                        {booking.vouchers.map((voucher) => (
                            <div>
                                <p>{voucher.quantity}</p>
                                <p>{voucher.voucher.name}</p>
                                <p>{voucher.voucher.reduceAmount}</p>
                            </div>
                        ))}
                    </div>}
                    <p>{booking.transaction[0].amount}</p>
                </div>
            ))}
            <div>
                {Array.from({ length: bookingHistory?.meta.totalPages as number}, (_, index) => (
                    <button 
                    key={index + 1} 
                    onClick={() => handleChoosePage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}