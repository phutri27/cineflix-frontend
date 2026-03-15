import { type SeatDetailData } from "./ScreenEditor"
import { useState } from "react"
import Select from 'react-select'

interface SeatGridLayoutProps {
    seats: SeatDetailData[]
    seat_type: {id: string, seat_type: string, cinemaId: string}[] | undefined
    setSeats: (newSeat: SeatDetailData[ ]) => void
}
export default function SeatGridLayout({seats, seat_type, setSeats}: SeatGridLayoutProps) {
    const [isEditingSeat, setIsEditingSeat] = useState<boolean>(false)
    const [selectedSeat, setSelectedSeat] = useState<{row: string, number: number} | null>(null)

    const handleDeleteSeat = (row: string, number: number) => {
        const updatedSeats = seats.filter(seat => !(seat.row === row && seat.number === number))
        setSeats(updatedSeats)
    }

    const handleEditSeat = (row: string, number: number) => {
        setIsEditingSeat(true)
        setSelectedSeat({row, number})
    }

    const applyEditSeat = (option: {value: string, label: string}, row: string, number: number) => {
        const updatedSeats = seats.map(seat => {
            if(seat.row === row && seat.number === number){
                return {
                    ...seat,
                    seat_typeId: option
                }
            }
            return seat
        })
        setSeats(updatedSeats)
        setSelectedSeat(null)
        setIsEditingSeat(false)
    }

    return (
        <div>
            {Array.from(new Set(seats.map(seat => seat.row)))
            .sort()
            .map((rowLetter) => (
                <div>
                    {seats.filter((seat) => seat.row === rowLetter)
                    .sort((a, b) => a.number - b.number)
                    .map((seat, index) => (
                        <>
                            <button onClick={() => handleEditSeat(seat.row, seat.number)}>Edit</button>
                            <button onClick={() => handleDeleteSeat(seat.row, seat.number)}>Delete</button>
                            {isEditingSeat && selectedSeat?.number == seat.number && selectedSeat.row == seat.row ? 
                                (<>
                            <Select
                                placeholder="Select seat type"
                                options={seat_type?.map(s => ({value: s.id, label: s.seat_type}))}
                                value={seat.seat_typeId}
                                onChange={(option) => applyEditSeat(option!, seat.row, seat.number)}
                            />
                            </>)
                            : (<button key={index}>{rowLetter + seat.number}</button>)
                            }
                        </>
                    ))}
                </div>
            ))
        }
        </div>
    )
}   