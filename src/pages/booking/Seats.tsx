import { useBookingStore } from "@/utils/booking-store"

interface SeatsProp{
    handleSeatTypePrice: (seat_typeId: string, seatId: string, row: string, number: number) => void
    screen: {
        id: string;
        name: string;
        seats: {
            id: string;
            row: string;
            number: number;
            seat_typeId: string;
            seatTypeDetail: {
                seat_type: string;
            };
        }[];
        cinema: {
            name: string;
        };
    } 
    lockedSeats: string[]
}

export default function Seats({screen, lockedSeats, handleSeatTypePrice}: SeatsProp){
    const ticketDatas = useBookingStore((state) => state.ticketDatas)

    return (
        <>
            {Array.from(new Set(screen?.seats.map(seat => seat.row)))
                .map((rowLetter) => (
                    <div>
                        {screen?.seats.filter((seat) => seat.row === rowLetter)
                            .map((seat) => {
                                const isSeatDisabled = lockedSeats?.includes(seat.id)
                                const seatType = seat.seatTypeDetail.seat_type
                                let isPickedStyle = ""
                                if (isSeatDisabled){
                                    isPickedStyle = "bg-gray-500 cursor-not-allowed"
                                } else if (ticketDatas.some((ticket) => ticket.row === seat.row && ticket.number == seat.number)){
                                    isPickedStyle = "bg-red-500"
                                } else{
                                    isPickedStyle = "bg-gray-200"
                                }

                                let seatTypeStyle = "border border-red-200"
                                if (seatType === "EMPTY"){
                                    seatTypeStyle = "invisible disabled"
                                } else if (seatType === "VIP"){
                                    seatTypeStyle = "border border-green-300"
                                } else if (seatType === "COUPLE"){
                                    seatTypeStyle = "border border-fuchsia-400"
                                }
                                const finalStyle = isPickedStyle + " " + seatTypeStyle
                                return (
                                    <button className={finalStyle} disabled={isSeatDisabled}
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
    )
}