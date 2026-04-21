import { type SeatDetailData } from "./ScreenEditor"
import { useState, useRef, useEffect } from "react"
import Select from 'react-select'
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { darkSelectGenreStyle } from "@/utils/react-select-style"

interface SeatGridLayoutProps {
    seats: SeatDetailData[]
    seat_type: {id: string, seat_type: string, cinemaId: string}[] | undefined
    setSeats: (newSeat: SeatDetailData[]) => void
}

const seatBorderColors: Record<string, string> = {
    VIP: "border-green-400",
    REGULAR: "border-red-400",
    COUPLE: "border-fuchsia-400",
    EMPTY: "border-sky-500 opacity-40",
}

export default function SeatGridLayout({ seats, seat_type, setSeats }: SeatGridLayoutProps) {
    const [isEditingSeat, setIsEditingSeat] = useState<boolean>(false)
    const [selectedSeat, setSelectedSeat] = useState<{row: string, number: number} | null>(null)
    const [menuOpen, setMenuOpen] = useState<{row: string, number: number} | null>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleDeleteSeat = (row: string, number: number) => {
        const updatedSeats = seats.filter(seat => !(seat.row === row && seat.number === number))
        setSeats(updatedSeats)
        setMenuOpen(null)
    }

    const handleEditSeat = (row: string, number: number) => {
        setIsEditingSeat(true)
        setSelectedSeat({ row, number })
        setMenuOpen(null)
    }

    const applyEditSeat = (option: {value: string, label: string}, row: string, number: number) => {
        const updatedSeats = seats.map(seat => {
            if (seat.row === row && seat.number === number) {
                return { ...seat, seat_typeId: option }
            }
            return seat
        })
        setSeats(updatedSeats)
        setSelectedSeat(null)
        setIsEditingSeat(false)
    }

    const toggleMenu = (row: string, number: number) => {
        setMenuOpen(prev =>
            prev?.row === row && prev?.number === number ? null : { row, number }
        )
    }

    const isMenuOpen = (row: string, number: number) =>
        menuOpen?.row === row && menuOpen?.number === number

    return (
        <div className="flex flex-col items-center gap-1.5 overflow-x-auto py-4">
            {Array.from(new Set(seats.map(seat => seat.row)))
                .sort()
                .map((rowLetter) => (
                    <div key={rowLetter} className="flex items-center gap-2">
                        <div className="text-neutral-500 font-bold text-xs w-6 text-right shrink-0">
                            {rowLetter}
                        </div>
                        <div className="flex gap-1">
                            {seats.filter((seat) => seat.row === rowLetter)
                                .sort((a, b) => a.number - b.number)
                                .map((seat) => {
                                    const seatLabel = seat.seat_typeId.label
                                    const isEmpty = seatLabel === "EMPTY"
                                    const borderColor = seatBorderColors[seatLabel] || "border-neutral-600"
                                    const isEditing = isEditingSeat && selectedSeat?.number === seat.number && selectedSeat?.row === seat.row

                                    return (
                                        <div key={seat.row + seat.number} className="relative">
                                            <div
                                                className={`relative border bg-transparent rounded-sm flex items-center justify-center h-9 w-9 text-[10px] font-bold select-none ${borderColor} ${isEmpty ? "text-neutral-600" : "text-neutral-300"}`}
                                            >
                                                {!isEmpty && (
                                                    <span>{seat.row}{seat.number}</span>
                                                )}
                                                <button
                                                    onClick={() => toggleMenu(seat.row, seat.number)}
                                                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-neutral-700 flex items-center justify-center opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity"
                                                    style={{ opacity: isMenuOpen(seat.row, seat.number) ? 1 : undefined }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                                                    onMouseLeave={(e) => {
                                                        if (!isMenuOpen(seat.row, seat.number)) e.currentTarget.style.opacity = "0"
                                                    }}
                                                >
                                                    <MoreVertical className="h-2.5 w-2.5 text-neutral-300" />
                                                </button>
                                            </div>
                                            {isMenuOpen(seat.row, seat.number) && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl z-50 overflow-hidden w-28"
                                                >
                                                    <button
                                                        onClick={() => handleEditSeat(seat.row, seat.number)}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                                                    >
                                                        <Pencil className="h-3 w-3" />
                                                        Edit Type
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSeat(seat.row, seat.number)}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                            {isEditing && (
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-36 z-50">
                                                    <Select
                                                        placeholder="Type..."
                                                        options={seat_type?.map(s => ({ value: s.id, label: s.seat_type }))}
                                                        value={seat.seat_typeId}
                                                        onChange={(option) => applyEditSeat(option!, seat.row, seat.number)}
                                                        styles={darkSelectGenreStyle}
                                                        menuIsOpen
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}