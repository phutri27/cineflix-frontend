import type { PricingDetailProp } from "@/utils/booking-store"
import { format } from "date-fns"
import { ErrorMessages } from "@/utils/error-messages"

interface SeatDetailsProp {
    cinemaName: string | undefined
    showTime: Date | undefined
    screenName: string | undefined
    ticketDatas: PricingDetailProp[]
    isSeatTypeError?: boolean
    seatTypeError?: Error
    movie: {id: string, title: string, posterUrl: string, rated: string} | undefined
    handleGoToSnackVoucher: () => void
    handleBackToSeatSelection: () => void
    totalAmountBeforeDiscount: number
    totalAmount?: number
}

export default function PricingDetail({cinemaName, 
    showTime, 
    screenName, 
    ticketDatas, 
    movie, 
    isSeatTypeError, 
    seatTypeError, 
    handleGoToSnackVoucher, 
    handleBackToSeatSelection,
    totalAmountBeforeDiscount,
    totalAmount}: SeatDetailsProp){
    const date = showTime ? format(new Date(showTime), "HH:mm dd/MM/y") : null

    return (
        <>
            <div>
                <img className="h-30" src={movie?.posterUrl} alt={movie?.title} />
                <div>
                    <p>{movie?.title}</p>
                    <p>{movie?.rated}</p>
                </div>
            </div>
            <div className="flex">
                <div>
                    <p>Cinema</p>
                    <p>Showtime</p>
                    <p>Screen</p>
                    {ticketDatas.length > 0 && <p>Seats</p>}
                </div>
                <div>
                    <p>{cinemaName}</p>
                    <p>{date}</p>
                    <p>{screenName}</p>
                    {ticketDatas.length > 0 && <p>{ticketDatas.map((ticket) => ticket.row + ticket.number).join(", ")}</p>}
                </div>
                <div>
                    <p>{totalAmount ? "Old price: " : "Total price: "} {totalAmountBeforeDiscount}</p>
                    {totalAmount && <p>Total after discount: {Math.round(totalAmount)}</p>}
                </div>
                {isSeatTypeError && <ErrorMessages error={seatTypeError!} />}
            </div>
            <div>
                <button onClick={handleBackToSeatSelection}>Back</button>
                <button onClick={handleGoToSnackVoucher}>Next</button>
            </div>
        </>
    )
}