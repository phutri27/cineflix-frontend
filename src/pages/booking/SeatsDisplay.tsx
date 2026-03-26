import { useGetSpecificShowTime } from "@/hooks/user/movies/use-showtime";
import { useParams, useNavigate } from "react-router";
import { useGetSeatType } from "@/hooks/user/use-seat-type";
import { useState } from "react";
import PricingDetail from "./PricingDetail";
import { ErrorMessages } from "@/utils/error-messages";
import Header from "@/components/Header";
import SnackVoucherScreen from "./SnackVoucherScreen";
import { usePostBooking, useGetLockedSeat } from "@/hooks/user/use-booking";

export interface PricingDetailProp {
    id: string
    seat_id: string
    price: string
    seat_type: string
    row: string
    number: number
}

export interface SnackData {
    snackId: string
    price: number
    quantity: number
}

export interface VoucherData {
    voucherId: string
    reduceAmount: number
    quantity: number
}

export default function SeatsDisplay(){
    const [ticketDatas, setTicketDatas] = useState<PricingDetailProp[]>([])
    const [snackQuantities, setSnackQuantities] = useState<SnackData[]>([])
    const [isSnackVoucherScreen, setIsSnackVoucherScreen] = useState<boolean>(false)
    const [voucherQuantity, setVoucherQuantity] = useState<VoucherData[]>([])

    const navigate = useNavigate()

    const { cinemaId, showTimeId } = useParams()

    const { data: lockedSeats } = useGetLockedSeat(showTimeId!)
    const { data: seatTypes, isError: isSeatTypeError, error: seatTypeError } = useGetSeatType(cinemaId!)
    const { data: showTimeData, isError: isShowTimeError, error: showTimeError, isLoading } = useGetSpecificShowTime(showTimeId!)
    const { mutate: postBooking } = usePostBooking()

    const totalAmountBeforeDiscount = ticketDatas.reduce((total, ticket) => total + parseInt(ticket.price), 0) + snackQuantities.reduce((total, snack) => total + (snack.price * snack.quantity), 0)
    const totalDiscount = voucherQuantity.reduce((total, voucher) => total + (voucher.reduceAmount * voucher.quantity), 0)
    const totalAmount = totalAmountBeforeDiscount - ((totalDiscount / 100) * totalAmountBeforeDiscount)

    const handleGoToSnackVoucher = () => {
        if (ticketDatas.length === 0){
            alert("Please pick a seat before continue")
            return
        }
        if (isSnackVoucherScreen){
            const seatIds = ticketDatas.map((ticket) => ticket.seat_id)
            const data = {
                movieId: showTimeData?.movie.id,
                showtimeId: showTimeId!,
                totalAmount: totalAmount,
                snacks: snackQuantities,
                vouchers: voucherQuantity
            }
            postBooking({data, seatIds}, {
                onSuccess: () => {
                    navigate("/default/checkout/payment")
                },
                onError: () => {
                    alert("This seat has been taken, please choose another seat")
                    setIsSnackVoucherScreen(false)
                }
            })
        } else{
            setIsSnackVoucherScreen(true)
        }
    }

    const handleBackToSeatSelection = () => {
        setIsSnackVoucherScreen(false)
    }

    const handleSeatTypePrice = (seatTypeId: string, seatId: string, row: string, number: number) => {
        const isPickedSeat = ticketDatas.some((ticket) => ticket.row === row && ticket.number == number)
        if (!isPickedSeat){
            const seatType = seatTypes?.find((type) => type.id === seatTypeId)
            const newTicketData = {...seatType, seat_id: seatId, row, number} as PricingDetailProp
            setTicketDatas((prev) => [...prev, newTicketData])
        } else {
            setTicketDatas((prev) => prev.filter((ticket) => !(ticket.row === row && ticket.number === number)))
        }
    }

    const screen = showTimeData?.screen

    return (
        <>
            <Header />
            {isSnackVoucherScreen ?  
            <SnackVoucherScreen 
            snackQuantities={snackQuantities} 
            setSnackQuantities={setSnackQuantities}
            setVoucherQuantity={setVoucherQuantity}/> : (
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