import { useDeleteBooking, useGetBookingInfo } from "@/hooks/user/use-booking";
import { useParams, useNavigate } from "react-router";
import { useBookingStore } from "@/utils/booking-store";
import { useEffect, useState } from "react";
import { generateTimer } from "@/utils/timer";
import { format } from "date-fns";

export default function Payment() {
    const [remainingTimes, setRemainingTimes] = useState<number>(0)

    const navigate = useNavigate()
    const { bookingId } = useParams()
    const { mutate: deleteBooking } = useDeleteBooking()
    const { data: bookingInfo, isLoading } = useGetBookingInfo(String(bookingId))

    const seats = useBookingStore((state) => state.seatIds)
    const seatIds = seats.map((seat) => seat.id)
    const seatInfo = seats.map((seat) => seat.row + seat.number)

    const handleCancelBooking = () => {
        deleteBooking({bookingId, seatIds}, {
            onSuccess: () => {
                localStorage.removeItem("times-remain")
                navigate(-1)
            },
            onError: () => {
                alert("Failed to cancel booking, please try again")
            }
        })
    }

    useEffect(() => {
        let deadline = Number(localStorage.getItem("times-remain"))
        if (!deadline){
            deadline = (Date.now() + 300 * 1000) 
            localStorage.setItem("times-remain", JSON.stringify(deadline))
        }

        const timer = setInterval(() => {
            const remains = deadline - Date.now()
            if (remains <= 0){
                clearInterval(timer)
                setRemainingTimes(0)
                deleteBooking({bookingId, seatIds}, {
                    onSuccess: () => {
                        alert("Time out for payment")
                    }
                })
                localStorage.removeItem("times-remain")
            } else{
                setRemainingTimes(Math.floor(remains / 1000))
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    if (isLoading){
        return <div>Loading...</div>
    }

    const remains = generateTimer(remainingTimes)
    const startTime = bookingInfo?.showtime.startTime.toString().replace("Z", "")
    const formattedStartTime = startTime ? format(new Date(startTime), "HH:mm dd/MM/y") : null
    return (
        <div>
            <h1>Payment</h1>
            <div>
                <h2>Form of payment</h2>
            </div>
            <div>
                <h2>Booking summary</h2>
                <div>
                    <img className="h-30" src={bookingInfo?.movie.posterUrl} alt={bookingInfo?.movie.title} />
                    <p>{bookingInfo?.movie.title}</p>
                    <p>{bookingInfo?.movie.rated}</p>
                </div>
                <div>
                    <p>Cinema: {bookingInfo?.showtime.screen.cinema.name}</p>
                    <p>Showtime: {formattedStartTime}</p>
                    <p>Screen: {bookingInfo?.showtime.screen.name}</p>
                    <p>Seats: {seatInfo.join(" ")}</p>
                </div>
                <div>
                    <p>Total amount: {bookingInfo?.totalAmount}</p>
                </div>
            </div>
            <div>
                <p>Timer: {remains}</p>
                
            </div>
            <button onClick={handleCancelBooking}>Cancel</button>
        </div>
    )
}