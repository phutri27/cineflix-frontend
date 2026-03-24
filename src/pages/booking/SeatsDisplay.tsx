import { useGetSpecificShowTime } from "@/hooks/user/movies/use-showtime";
import { useParams } from "react-router";
import { useGetSeatType } from "@/hooks/user/use-seat-type";
import { useState } from "react";
import PricingDetail from "./PricingDetail";
import { ErrorMessages } from "@/utils/error-messages";

export interface PricingDetailProp {
    id: string
    price: string
    seat_type: string
    row: string
    number: number
}

export default function SeatsDisplay(){
    const [ticketDatas, setTicketDatas] = useState<PricingDetailProp[]>([])

    const { cinemaId, showTimeId } = useParams()

    const { data: seatTypes, isError: isSeatTypeError, error: seatTypeError } = useGetSeatType(cinemaId!)
    const { data: showTimeData, isError: isShowTimeError, error: showTimeError, isLoading } = useGetSpecificShowTime(showTimeId!)
    
    const handleSeatTypePrice = (seatTypeId: string, row: string, number: number) => {
        const isPickedSeat = ticketDatas.some((ticket) => ticket.row === row && ticket.number == number)
        if (!isPickedSeat){
            const seatType = seatTypes?.find((type) => type.id === seatTypeId)
            const newTicketData = {...seatType, row, number} as PricingDetailProp
            setTicketDatas((prev) => [...prev, newTicketData])
        } else {
            setTicketDatas((prev) => prev.filter((ticket) => !(ticket.row === row && ticket.number === number)))
        }
        
    }

    const screen = showTimeData?.screen

    return (
        <div>
            {isLoading && <p>Loading seats...</p>}
            {isShowTimeError && <ErrorMessages error={showTimeError} />}
            {Array.from(new Set(screen?.seats.map(seat => seat.row)))
                .map((rowLetter) => (
                    <div>
                        {screen?.seats.filter((seat) => seat.row === rowLetter)
                            .map((seat) => {
                                const isPickedStyle = ticketDatas.some((ticket) => ticket.row === seat.row && ticket.number == seat.number) ?
                                "bg-red-500" : "bg-gray-200"
                                return (
                                    <button className={isPickedStyle} onClick={() => handleSeatTypePrice(seat.seat_typeId, seat.row, seat.number)}>
                                        {seat.row + seat.number}
                                    </button>
                                )
                            })
                        }
                    </div>
                ))
            }
            <PricingDetail 
                ticketDatas={ticketDatas}
                cinemaName={screen?.cinema.name}
                showTime={showTimeData?.startTime}
                screenName={screen?.name}
                movie={showTimeData?.movie}
                isSeatTypeError={isSeatTypeError}
                seatTypeError={seatTypeError!}
            />
        </div>
    )
}