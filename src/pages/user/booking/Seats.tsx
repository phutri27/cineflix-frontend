import { useBookingStore } from "@/utils/booking-store"
import { clsx } from 'clsx'
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
    const seatTypes = Array.from(new Set(screen?.seats.map((st) => st.seatTypeDetail.seat_type)))

    return (
        <div className="bg-[#141414] text-white p-6 md:p-10 font-sans">
            <div className="text-center mb-10 border-b border-neutral-700 pb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {screen?.cinema.name}
                </h1>
                <p className="text-neutral-400 text-lg md:text-xl font-medium mt-1">
                    Screen: {screen?.name}
                </p>
            </div>
            <div className="flex justify-center mb-16 relative">
                <div className="relative w-full max-w-[500px] h-[50px] md:h-[60px] border-t-2 border-l-2 border-r-2 border-white rounded-t-full">
                    <div className="absolute top-0 w-full h-full bg-black/40 blur-lg rounded-t-full"></div>
                </div>
                <div className="absolute top-[20px] left-1/2 -translate-x-1/2 text-base md:text-lg font-bold text-neutral-200 tracking-[0.2em] uppercase z-10">
                    SCREEN
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 mb-16">
                {Array.from(new Set(screen?.seats.map(seat => seat.row)))
                    .map((rowLetter) => (
                        <div key={rowLetter} className="flex items-center gap-3">
                            <div className="text-neutral-500 font-bold text-lg w-[40px] text-right">
                                {rowLetter}
                            </div>
                            <div className="flex gap-1">
                                {screen?.seats.filter((seat) => seat.row === rowLetter)
                                    .map((seat) => {
                                        const isSeatDisabled = lockedSeats?.includes(seat.id)
                                        const seatType = seat.seatTypeDetail.seat_type
                                        const isUserSelected = ticketDatas.some((ticket) => ticket.row === seat.row && ticket.number == seat.number)
                                        
                                        let isPickedStyle = ""
                                        if (isSeatDisabled){
                                            isPickedStyle = "bg-neutral-600 border-neutral-700 cursor-not-allowed"
                                        } else if (isUserSelected){
                                            isPickedStyle = "bg-red-600 border-red-700"
                                        } else{
                                            isPickedStyle = "bg-transparent hover:scale-105 transition-transform hover:border-white"
                                        }

                                        let seatTypeStyle = ""
                                        if (seatType === "EMPTY"){
                                            seatTypeStyle = "invisible disabled"
                                        } else if (seatType === "VIP"){
                                            seatTypeStyle = "border-green-400"
                                        } else if (seatType === "REGULAR"){
                                            seatTypeStyle = "border-red-400"
                                        } else if (seatType === "COUPLE"){
                                            seatTypeStyle = "border-fuchsia-400"
                                        } else if (seatType === "REPAIR"){
                                            seatTypeStyle = `border-neutral-600 bg-neutral-700/50 
                                            cursor-not-allowed overflow-hidden before:absolute 
                                            before:w-[140%] before:h-[2px] before:bg-neutral-400 
                                            before:top-1/2 before:left-[-20%] before:-rotate-45 
                                            before:origin-center`
                                        }

                                        const finalStyle = clsx(
                                            "relative border flex items-center justify-center font-semibold text-[10px] h-6 w-6 md:h-7 md:w-7 rounded-sm cursor-pointer select-none",
                                            isPickedStyle,
                                            seatTypeStyle
                                        )

                                        return (
                                            <button 
                                                key={seat.id}
                                                className={finalStyle} 
                                                disabled={isSeatDisabled || seatType == "REPAIR"}
                                                onClick={() => handleSeatTypePrice(seat.seat_typeId, seat.id, seat.row, seat.number)}
                                                title={`${seatType} SEAT: ${seat.row}${seat.number}`}
                                            >
                                                {seatType !== "EMPTY" && (seat.row + seat.number)}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="mt-16 bg-neutral-900/50 p-6 md:p-8 rounded-lg border border-neutral-700 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-neutral-700 pb-3">Legend</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-8">
                    {seatTypes.map((st) => {
                        if (st === "EMPTY") return null;

                        let swatchClasses = "border h-6 w-6 rounded-sm bg-transparent"
                        let label = `${st} Seat`

                        if (st === "VIP") {
                            swatchClasses += " border-green-400"
                            label = "VIP Seat"
                        } else if (st === "REGULAR") {
                            swatchClasses += " border-red-400"
                            label = "Regular Seat"
                        } else if (st === "COUPLE") {
                            swatchClasses += " border-fuchsia-400"
                            label = "Couple Seat"
                        } else if (st === "REPAIR") {
                            swatchClasses = "relative border border-neutral-600 bg-neutral-700/50 h-6 w-6 rounded-sm overflow-hidden before:absolute before:w-[140%] before:h-[2px] before:bg-neutral-400 before:top-1/2 before:left-[-20%] before:-rotate-45 before:origin-center"
                            label = "Under Repair"
                        }

                        return (
                            <div key={st} className="flex items-center gap-3">
                                <div className={swatchClasses}></div>
                                <p className="text-neutral-300 font-semibold">{label}</p>
                            </div>
                        )
                    })}
                    
                    {/* Status Legend Entries */}
                    <div className="flex items-center gap-3">
                        <div className="border border-red-700 bg-red-600 h-6 w-6 rounded-sm"></div>
                        <p className="text-neutral-300 font-semibold">Selected Seat</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="border border-neutral-700 bg-neutral-600 h-6 w-6 rounded-sm"></div>
                        <p className="text-neutral-300 font-semibold">Taken Seat</p>
                    </div>
                </div>
            </div>
        </div>
    )
}