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
        <div className="bg-[#141414] text-white px-6 py-4 font-sans">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center gap-3 shrink-0">
                    <img className="h-20 rounded" src={movie?.posterUrl} alt={movie?.title} />
                    <div>
                        <p className="text-sm font-bold text-white">{movie?.title}</p>
                        <span className="text-[10px] font-semibold bg-neutral-700 text-neutral-300 px-1.5 py-0.5 rounded">
                            {movie?.rated}
                        </span>
                    </div>
                </div>
                <div className="flex gap-4 text-sm flex-1 min-w-0">
                    <div className="flex flex-col gap-1 text-neutral-500 font-medium shrink-0">
                        <p>Cinema</p>
                        <p>Showtime</p>
                        <p>Screen</p>
                        {ticketDatas.length > 0 && <p>Seats</p>}
                    </div>
                    <div className="flex flex-col gap-1 text-neutral-200 font-semibold min-w-0">
                        <p className="truncate">{cinemaName}</p>
                        <p>{date}</p>
                        <p>{screenName}</p>
                        {ticketDatas.length > 0 && (
                            <p className="truncate">{ticketDatas.map((ticket) => ticket.row + ticket.number).join(", ")}</p>
                        )}
                    </div>
                </div>
                <div className="text-sm text-right shrink-0">
                    <p className={totalAmount ? "text-neutral-500 line-through" : "text-white font-bold"}>
                        {totalAmount ? "Old price: " : "Total: "}{totalAmountBeforeDiscount.toLocaleString()} VND
                    </p>
                    {totalAmount && (
                        <p className="text-green-400 font-bold">
                            After discount: {Math.round(totalAmount).toLocaleString()}
                        </p>
                    )}
                </div>
                {isSeatTypeError && <ErrorMessages error={seatTypeError!} />}
                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={handleBackToSeatSelection}
                        className="px-4 py-2 text-sm font-semibold rounded border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition-colors"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleGoToSnackVoucher}
                        className="px-4 py-2 text-sm font-bold rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}