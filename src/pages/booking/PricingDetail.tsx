import type { PricingDetailProp } from "./SeatsDisplay"
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
}

export default function PricingDetail({cinemaName, showTime, screenName, ticketDatas, movie, isSeatTypeError, seatTypeError}: SeatDetailsProp){
    const date = showTime ? format(new Date(showTime.toString().replace("Z", "")), "HH:mm dd/MM/y") : null
    const totalPrice = ticketDatas.reduce((total, ticket) => total + Number(ticket.price), 0)
    return (
        <div>
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
                    Total price : {totalPrice}
                </div>
            </div>
            {isSeatTypeError && <ErrorMessages error={seatTypeError!} />}
        </div>
    )
}