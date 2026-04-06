import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { generateTimer } from "@/utils/timer";
import { format } from "date-fns";
import { useStripeCheckout, useVnpayCheckout } from "@/hooks/user/use-payment-checkout";
import { useBookingStore } from "@/utils/booking-store";
import { useGetSpecificShowTime } from "@/hooks/user/movies/use-showtime";
import { useSearchParams } from "react-router";

export default function Payment() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [remainingTimes, setRemainingTimes] = useState<number>(0)
    const [paymentPick, setPaymentPick] = useState<string>('')

    const { showTimeId } = useParams()
    const bookingId = searchParams.get("booking") || ""

    const {data: bookingInfo} = useGetSpecificShowTime(showTimeId!)
    const { mutate: stripeCheckout } = useStripeCheckout()
    const { mutate: vnpayCheckout } = useVnpayCheckout()

    const seats = useBookingStore((state) => state.ticketDatas)
    const ticketDatas = useBookingStore((state) => state.ticketDatas)
    const snacks = useBookingStore((state) => state.snackQuantities)
    const vouchers = useBookingStore((state) => state.voucherQuantity)
    const totalAmount = useBookingStore((state) => state.totalAmount)
    const clearAllData = useBookingStore((state) => state.clearBookingData)

    const handlePayment = () => {
        const datas = {
            movieId:bookingInfo?.movie.id,
            showtimeId: showTimeId!,
            seats: seats,
            snacks: snacks,
            vouchers: vouchers,
            bookingId: bookingId
        }
        if (paymentPick === "cards"){
            stripeCheckout(datas, {
                onSuccess: (data) => {
                    if (!bookingId){
                        setSearchParams({booking: data.bookingId})
                    }
                    window.open(data.redirectUrl, '_blank')
                },
                onError: (error) => {
                    if (error.response?.data.seatTaken){
                        alert("This seat has been taken, pleast book another seat")
                    } else if (error.response?.data.transactionMethodPicked){
                        alert("This payment method is currently operating, please finish it")
                    } else if (error.response?.data.bookingExpire){
                        alert("This booking session has expired, please pick seats again")
                    }
                }
            })
        } else if (paymentPick === "vnpay") {
           vnpayCheckout(datas, {
                onSuccess: (data) => {
                    if (!bookingId){
                        setSearchParams({booking: data.bookingId})
                    }
                    window.open(data.paymentUrl, '_blank')
                },
                onError: (error) => {
                     if (error.response?.data.seatTaken){
                        alert("This seat has been taken, pleast book another seat")
                    } else if (error.response?.data.transactionMethodPicked){
                        alert("This payment method is currently operating, please finish it")
                    } else if (error.response?.data.bookingExpire){
                        alert("This booking session has expired, please pick seats again")
                    } else {
                        alert("Unknown error")
                    }
                }
           })
        }
    }

    const handlePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentPick(e.target.value)
    }

    // useEffect(() => {
    //     const handleCrossTabSync = (event: StorageEvent) => {
    //         if (event.key === "picked-movie-store" || event.newValue === null) {
    //             clearAllData(); 
    //         }
    //     };
    //     window.addEventListener("storage", handleCrossTabSync);

    //     return () => {
    //         window.removeEventListener("storage", handleCrossTabSync);
    //     };
    // }, [clearAllData]);

    useEffect(() => {
        const deadline = (Date.now() + 300 * 1000)

        const timer = setInterval(() => {
            const remains = deadline - Date.now()
            if (remains <= 0){
                clearInterval(timer)
                setRemainingTimes(0)
            } else{
                setRemainingTimes(Math.floor(remains / 1000))
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    if (ticketDatas.length == 0){
        return <div>Click here to return to homepage</div>
    }

    const seatInfo = ticketDatas.map((seat) => seat.row + seat.number) 
    
    const remains = generateTimer(remainingTimes)
    const formattedStartTime = bookingInfo?.startTime ? format(bookingInfo?.startTime as Date, "HH:mm dd/MM/y")  : null
    return (
        <div>
            <h1>Payment</h1>
            <div>
                <h2>Form of payment</h2>
                <form>
                    <div>
                        <label htmlFor="vnpay">VNPAY</label>
                        <input 
                        type="radio" 
                        id="vnpay" 
                        name="payment_choice" 
                        value="vnpay"
                        onChange={handlePaymentMethod}/>
                    </div>
                    <div>
                        <label htmlFor="cards">Credit and debit cards</label>
                        <input type="radio" 
                        id="cards" 
                        name="payment_choice"
                        value="cards" 
                        onChange={handlePaymentMethod}/>
                    </div>
                </form>
            </div>
            <div>
                <h2>Booking summary</h2>
                <div>
                    <img className="h-30" src={bookingInfo?.movie.posterUrl} alt={bookingInfo?.movie.title} />
                    <p>{bookingInfo?.movie.title}</p>
                    <p>{bookingInfo?.movie.rated}</p>
                </div>
                <div>
                    <p>Cinema: {bookingInfo?.screen.cinema.name}</p>
                    <p>Showtime: {formattedStartTime}</p>
                    <p>Screen: {bookingInfo?.screen.name}</p>
                    <p>Seats: {seatInfo!.join(" ")}</p>
                </div>
                <div>
                    <p>Total amount: {totalAmount}</p>
                </div>
            </div>
            <div>
                <p>Timer: {remains}</p>
                
            </div>
            <button onClick={handlePayment}>Payment</button>
        </div>
    )
}