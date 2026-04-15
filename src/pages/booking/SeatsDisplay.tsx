import { useGetSpecificShowTime } from "@/hooks/user/movies/use-showtime";
import { useParams, useNavigate } from "react-router";
import { useGetSeatType } from "@/hooks/user/use-seat-type";
import PricingDetail from "./PricingDetail";
import { ErrorMessages } from "@/utils/error-messages";
import Header from "@/components/Header";
import SnackVoucherScreen from "./SnackVoucherScreen";
import { useGetLockedSeat } from "@/hooks/user/use-seats";
import { io } from "socket.io-client"
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useBookingStore } from "@/utils/booking-store";
import { useUserRoleStore } from "@/utils/user-role-store";
import { useVerifyUser } from "@/hooks/user/use-user";
import Seats from "./Seats"
import Footer from "@/components/Footer";

const socket = io(import.meta.env.VITE_API_URL)
export default function SeatsDisplay(){
    const ticketDatas = useBookingStore((state) => state.ticketDatas)
    const snackQuantities = useBookingStore((state) => state.snackQuantities)
    const voucherQuantity = useBookingStore((state) => state.voucherQuantity)
    const isSnackVoucherScreen = useBookingStore((state) => state.isSnackVoucherScreen)
    const setSeatTypePrice = useBookingStore((state) => state.setSeatTypePrice)
    const setIsSnackVoucherScreen = useBookingStore((state) => state.setIsSnackVoucherScreen)
    const setTotalAmount = useBookingStore((state) => state.setTotalAmount)
    const clearBookingData = useBookingStore((state) => state.clearBookingData)
    const id = useUserRoleStore((state) => state.id)

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const { cinemaId, showTimeId } = useParams()
    const { data: user } = useVerifyUser(id)
    const { data: lockedSeats } = useGetLockedSeat(showTimeId!)
    const { data: seatTypes, isError: isSeatTypeError, error: seatTypeError } = useGetSeatType(cinemaId!)
    const { data: showTimeData, isError: isShowTimeError, error: showTimeError, isLoading } = useGetSpecificShowTime(showTimeId!)

    const totalAmountBeforeDiscount = ticketDatas.reduce((total, ticket) => total + parseInt(ticket.price), 0) + snackQuantities.reduce((total, snack) => total + (snack.price * snack.quantity), 0)
    const totalDiscount = voucherQuantity.reduce((total, voucher) => total + (voucher.reduceAmount * voucher.quantity), 0)
    const totalAmount = totalAmountBeforeDiscount - ((totalDiscount / 100) * totalAmountBeforeDiscount)

    const handleGoToSnackVoucher = () => {
        if (!user?.isLogin){
            navigate("/login", {state: {message: "Please login first to buy a ticket"}})
        }
        if (ticketDatas.length === 0){
            alert("Please pick a seat before continue")
            return
        }
        if (isSnackVoucherScreen){
            setTotalAmount(totalAmount)
            navigate(`/default/checkout/payment/${showTimeId}`)
        } else{
            setIsSnackVoucherScreen(true)
        }
    }

    const handleBackToSeatSelection = () => {
        setIsSnackVoucherScreen(false)
    }

    const handleSeatTypePrice = (seatTypeId: string, seatId: string, row: string, number: number) => {
        const seatType = seatTypes?.find((seat) => seat.id === seatTypeId)
        setSeatTypePrice(seatType!, seatId, row, number)
    }

    useEffect(() => {
        clearBookingData()
        useBookingStore.persist.clearStorage()
    }, [clearBookingData])

    useEffect(() => {
        const handleSeatStatusUpdate = (newLockedSeatId: string[]) => {
            queryClient.setQueryData(["lockedSeats", showTimeId], (oldData: string[] | undefined) => {
                if (!oldData) return [newLockedSeatId];
                return [...oldData, ...newLockedSeatId]; 
            });
        };

        const handleExpiredSeat = (oldLockedSeatId: string) => {
            queryClient.setQueryData(["lockedSeats", showTimeId], (oldData: string[] | undefined) => {
                const newData = oldData!.filter((seatId) => seatId !== oldLockedSeatId)
                return [...newData]
            })
        }
        socket.on('seats_status', handleSeatStatusUpdate);
        socket.on(`seat-expired`, handleExpiredSeat)
        return () => {
            socket.off('seats_status', handleSeatStatusUpdate);
            socket.off(`seat-expired`, handleExpiredSeat)
        };
    }, [queryClient, showTimeId]);

    const screen = showTimeData?.screen

    return (
    <>
        <Header />
        <div className="bg-[#141414] flex flex-col h-[calc(100vh-/* header height, e.g. 64px */)]">
            {/* Scrollable seat area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {isSnackVoucherScreen ?  
                    <SnackVoucherScreen 
                    snackQuantities={snackQuantities} 
                    /> : (
                        <div>
                            {isLoading && <p>Loading seats...</p>}
                            {isShowTimeError && <ErrorMessages error={showTimeError} />}
                            <Seats 
                            screen={screen!} 
                            lockedSeats={lockedSeats!}
                            handleSeatTypePrice={handleSeatTypePrice}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="shrink-0 h-full border-t border-neutral-700">
                <div className="max-w-5xl mx-auto">
                    <PricingDetail 
                        ticketDatas={ticketDatas}
                        cinemaName={screen?.cinema.name}
                        showTime={showTimeData?.startTime}
                        screenName={screen?.name}
                        movie={showTimeData?.movie}
                        isSeatTypeError={isSeatTypeError}
                        seatTypeError={seatTypeError!}
                        handleGoToSnackVoucher={handleGoToSnackVoucher}
                        handleBackToSeatSelection={handleBackToSeatSelection}
                        totalAmountBeforeDiscount={totalAmountBeforeDiscount}
                        totalAmount={totalDiscount > 0 ? totalAmount : undefined}
                    />
                </div>
            </div>
            <Footer />
        </div>
    </>
    )
}