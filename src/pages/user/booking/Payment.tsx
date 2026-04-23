import { useParams, Link } from "react-router";
import React, { useState } from "react";
import { generateTimer } from "@/utils/timer";
import { format } from "date-fns";
import { useSearchParams } from "react-router";
import LoadingScreen from "./LoadingScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePaymentCheckout, useBookedStore, useShowtime, useTimer  } from "@/hooks"
import { toast } from 'react-toastify'
export default function Payment() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [paymentPick, setPaymentPick] = useState<string>('')
    const remainingTimes = useTimer.useSetTimer(300, true)

    const { showTimeId } = useParams()
    const bookingId = searchParams.get("booking") || ""

    const {data: bookingInfo, isLoading} = useShowtime.useGetSpecificShowTime(showTimeId!)
    const { mutate: stripeCheckout } = usePaymentCheckout.useStripeCheckout()
    const { mutate: vnpayCheckout } = usePaymentCheckout.useVnpayCheckout()

    const seats = useBookedStore.useBookingStore((state) => state.ticketDatas)
    const ticketDatas = useBookedStore.useBookingStore((state) => state.ticketDatas)
    const snacks = useBookedStore.useBookingStore((state) => state.snackQuantities)
    const vouchers = useBookedStore.useBookingStore((state) => state.voucherQuantity)
    const totalAmount = useBookedStore.useBookingStore((state) => state.totalAmount)

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
                        toast.error("This seat has been taken, please book another seat")
                    } else if (error.response?.data.transactionMethodPicked){
                        toast.error("This payment method is currently operating, please finish it")
                    } else if (error.response?.data.bookingExpire){
                        toast.error("This booking session has expired, please pick seats again")
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
                        toast.error("This seat has been taken, please book another seat")
                    } else if (error.response?.data.transactionMethodPicked){
                        toast.error("This payment method is currently operating, please finish it")
                    } else if (error.response?.data.bookingExpire){
                        toast.error("This booking session has expired, please pick seats again")
                    } else {
                        toast.error("An unexpected error occurred, please try again")
                    }
                }
           })
        }
    }

    const handlePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentPick(e.target.value)
    }

    if (isLoading) {
       return <LoadingScreen />
    }

    if (ticketDatas.length == 0){
        return (
            <div className="bg-[#141414] text-white min-h-screen flex items-center justify-center font-sans">
                <p className="text-neutral-400">No tickets selected. <Link to="/">Click here to return to homepage.</Link></p>
            </div>
        )
    }

    const seatInfo = ticketDatas.map((seat) => seat.row + seat.number) 
    const remains = generateTimer(remainingTimes)
    const formattedStartTime = bookingInfo?.startTime ? format(bookingInfo?.startTime as Date, "HH:mm dd/MM/y") : null

    return (
        <div className="flex flex-col min-h-screen bg-[#141414] text-white font-sans">
        <Header />
        <main className="p-6 md:p-10 font-sans">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-10 border-b border-neutral-700 pb-6">
                Payment
            </h1>
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
                <div className="bg-red-950/40 border border-red-800 rounded-lg px-5 py-3 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <p className="text-red-500 font-bold text-lg tracking-wide">{remains}</p>
                </div>
                <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Form of Payment</h2>
                    <div className="flex flex-col gap-3">
                        <label
                            htmlFor="vnpay"
                            className={`flex items-center gap-4 border rounded-lg px-5 py-4 cursor-pointer transition-colors ${
                                paymentPick === "vnpay"
                                    ? "border-red-600 bg-red-600/10"
                                    : "border-neutral-700 bg-neutral-800/50 hover:border-neutral-500"
                            }`}
                        >
                            <input
                                type="radio"
                                id="vnpay"
                                name="payment_choice"
                                value="vnpay"
                                onChange={handlePaymentMethod}
                                className="hidden"
                            />
                            <div className="h-10 w-14 bg-white rounded flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-10" viewBox="0 0 40 24">
                                    <rect width="40" height="24" rx="2" fill="#fff"/>
                                    <text x="5" y="17" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="11" fill="#0050a0">VN</text>
                                    <text x="21" y="17" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="11" fill="#d32f2f">PAY</text>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-white">VNPay</p>
                                <p className="text-xs text-neutral-400">Pay via VNPay gateway</p>
                            </div>
                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                paymentPick === "vnpay" ? "border-red-500" : "border-neutral-600"
                            }`}>
                                {paymentPick === "vnpay" && <div className="h-2.5 w-2.5 rounded-full bg-red-500"/>}
                            </div>
                        </label>
                        <label
                            htmlFor="cards"
                            className={`flex items-center gap-4 border rounded-lg px-5 py-4 cursor-pointer transition-colors ${
                                paymentPick === "cards"
                                    ? "border-red-600 bg-red-600/10"
                                    : "border-neutral-700 bg-neutral-800/50 hover:border-neutral-500"
                            }`}
                        >
                            <input
                                type="radio"
                                id="cards"
                                name="payment_choice"
                                value="cards"
                                onChange={handlePaymentMethod}
                                className="hidden"
                            />
                            <div className="h-10 w-14 bg-neutral-700 rounded flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-8 text-neutral-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                                    <line x1="1" y1="10" x2="23" y2="10"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-white">Credit / Debit Card</p>
                                <p className="text-xs text-neutral-400">Visa, Mastercard, and more</p>
                            </div>
                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                paymentPick === "cards" ? "border-red-500" : "border-neutral-600"
                            }`}>
                                {paymentPick === "cards" && <div className="h-2.5 w-2.5 rounded-full bg-red-500"/>}
                            </div>
                        </label>
                    </div>
                </div>
                <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Booking Summary</h2>
                    <div className="flex gap-4 mb-4">
                        <img
                            className="h-28 rounded shrink-0"
                            src={bookingInfo?.movie.posterUrl}
                            alt={bookingInfo?.movie.title}
                        />
                        <div>
                            <p className="text-sm font-bold text-white">{bookingInfo?.movie.title}</p>
                            <span className="text-[10px] font-semibold bg-neutral-700 text-neutral-300 px-1.5 py-0.5 rounded inline-block mt-1">
                                {bookingInfo?.movie.rated}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4 text-sm border-t border-neutral-700 pt-4">
                        <div className="flex flex-col gap-1.5 text-neutral-500 font-medium">
                            <p>Cinema</p>
                            <p>Showtime</p>
                            <p>Screen</p>
                            <p>Seats</p>
                        </div>
                        <div className="flex flex-col gap-1.5 text-neutral-200 font-semibold">
                            <p>{bookingInfo?.screen.cinema.name}</p>
                            <p>{formattedStartTime}</p>
                            <p>{bookingInfo?.screen.name}</p>
                            <p>{seatInfo.join(", ")}</p>
                        </div>
                    </div>
                    <div className="border-t border-neutral-700 mt-4 pt-4 flex justify-between items-center">
                        <p className="text-neutral-400 text-sm font-medium">Total Amount</p>
                        <p className="text-white text-lg font-bold">{totalAmount?.toLocaleString()} VND</p>
                    </div>
                </div>
                <button
                    onClick={handlePayment}
                    disabled={!paymentPick}
                    className="w-full py-3 text-base font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                >
                    Pay Now
                </button>
            </div>
        </main>
        <Footer />  
        </div>
    )
}