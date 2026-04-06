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

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const { cinemaId, showTimeId } = useParams()

    const { data: lockedSeats } = useGetLockedSeat(showTimeId!)
    const { data: seatTypes, isError: isSeatTypeError, error: seatTypeError } = useGetSeatType(cinemaId!)
    const { data: showTimeData, isError: isShowTimeError, error: showTimeError, isLoading } = useGetSpecificShowTime(showTimeId!)

    const totalAmountBeforeDiscount = ticketDatas.reduce((total, ticket) => total + parseInt(ticket.price), 0) + snackQuantities.reduce((total, snack) => total + (snack.price * snack.quantity), 0)
    const totalDiscount = voucherQuantity.reduce((total, voucher) => total + (voucher.reduceAmount * voucher.quantity), 0)
    const totalAmount = totalAmountBeforeDiscount - ((totalDiscount / 100) * totalAmountBeforeDiscount)

    const handleGoToSnackVoucher = () => {
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
            {isSnackVoucherScreen ?  
            <SnackVoucherScreen 
            snackQuantities={snackQuantities} 
            /> : (
                <>
                    {isLoading && <p>Loading seats...</p>}
                    {isShowTimeError && <ErrorMessages error={showTimeError} />}
                    {Array.from(new Set(screen?.seats.map(seat => seat.row)))
                        .map((rowLetter) => (
                            <div>
                                {screen?.seats.filter((seat) => seat.row === rowLetter)
                                    .map((seat) => {
                                        const isSeatDisabled = lockedSeats?.includes(seat.id)
                                        let isPickedStyle = ""
                                        if (isSeatDisabled){
                                            isPickedStyle = "bg-gray-500 cursor-not-allowed"
                                        } else if (ticketDatas.some((ticket) => ticket.row === seat.row && ticket.number == seat.number)){
                                            isPickedStyle = "bg-red-500"
                                        } else{
                                            isPickedStyle = "bg-gray-200"
                                        }
                                        return (
                                            <button className={isPickedStyle} disabled={isSeatDisabled}
                                            onClick={() => handleSeatTypePrice(seat.seat_typeId, seat.id, seat.row, seat.number)}>
                                                {seat.row + seat.number}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        ))
                    }
                </>
            )}
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
        </>
    )
}