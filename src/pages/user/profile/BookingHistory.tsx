
import { format } from "date-fns"
import { useGetPages } from "@/hooks/user/use-pages"
import Page from "@/components/Page"
import { useState } from "react"
import ModalComponent from "@/components/modal/Modal"
import { useUserStore, useProfile } from "@/hooks"

export default function BookingHistory() {
    const [expandedBooking, setExpandedBooking] = useState<string | null>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [choosenTicket, setChoosenTicket] = useState<string>("")

    const {  page,
        pageGroup, 
        handleChoosePage,
        incrementPageGroup,
        decrementPageGroup } = useGetPages()

    const userId = useUserStore.useUserRoleStore((state) => state.id)
    const { data: bookingHistory, isLoading, error } = useProfile.useGetBookingHistory(page, userId)

    const toggleTickets = (bookingId: string) => {
        setExpandedBooking((prev) => prev === bookingId ? null : bookingId)
    }

    const closeModal = () => {
        setOpenModal(false)
        setChoosenTicket("")
    }

    const chooseTicket = (url: string) => {
        setOpenModal(true)
        setChoosenTicket(url)
    }

    if (isLoading) {
        return <div className="p-6 md:p-8 text-neutral-400">Loading...</div>
    }

    if (error) {
        return <div className="p-6 md:p-8 text-red-500">Error: {error.message}</div>
    }

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-700 pb-4">
                Booking History
            </h2>

            {bookingHistory?.data.length === 0 && (
                <p className="text-neutral-500 text-sm">No bookings found.</p>
            )}

            <div className="flex flex-col gap-4">
                {bookingHistory?.data.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-neutral-800/40 border border-neutral-700 rounded-lg p-4 flex flex-col md:flex-row gap-4"
                    >
                        <div className="flex gap-3 shrink-0">
                            <img
                                src={booking.showtime.movie.posterUrl}
                                alt={`${booking.showtime.movie.title}'s poster`}
                                className="h-28 w-20 rounded object-cover shrink-0"
                            />
                            <div className="md:hidden">
                                <p className="text-sm font-bold text-white">{booking.showtime.movie.title}</p>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="hidden md:block text-sm font-bold text-white mb-2">
                                {booking.showtime.movie.title}
                            </p>
                            <div className="flex gap-4 text-xs mb-3">
                                <div className="flex flex-col gap-1 text-neutral-500 font-medium shrink-0">
                                    <p>Cinema</p>
                                    <p>Screen</p>
                                    <p>Showtime</p>
                                    <p>Seats</p>
                                </div>
                                <div className="flex flex-col gap-1 text-neutral-300 font-semibold min-w-0">
                                    <p className="truncate">{booking.showtime.screen.cinema.name}</p>
                                    <p>{booking.showtime.screen.name}</p>
                                    <p>{format(booking.showtime.startTime, "dd/MM/yyyy HH:mm")}</p>
                                    <p className="truncate">
                                        {booking.seats.map((seat) => seat.row + seat.number).join(", ")}
                                    </p>
                                </div>
                            </div>
                            {booking.snacks.length > 0 && (
                                <div className="border-t border-neutral-700 pt-2 mb-2">
                                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold mb-1">Snacks</p>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.snacks.map((snack, i) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-neutral-700/50 text-neutral-300 px-2 py-0.5 rounded"
                                            >
                                                {snack.quantity}x {snack.snack.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {booking.vouchers.length > 0 && (
                                <div className="border-t border-neutral-700 pt-2 mb-2">
                                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold mb-1">Vouchers</p>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.vouchers.map((voucher, i) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-green-900/30 border border-green-800 text-green-400 px-2 py-0.5 rounded"
                                            >
                                                {voucher.quantity}x {voucher.voucher.name} (-{voucher.voucher.reduceAmount}%)
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {booking.tickets.length > 0 && (
                                <div className="border-t border-neutral-700 pt-2 mb-2">
                                    <button
                                        onClick={() => toggleTickets(booking.id)}
                                        className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-500 font-bold mb-1 hover:text-neutral-300 transition-colors"
                                    >
                                        Tickets ({booking.tickets.length})
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-3 w-3 transition-transform ${
                                                expandedBooking === booking.id ? "rotate-180" : ""
                                            }`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                    {expandedBooking === booking.id && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {booking.tickets.map((ticket, i) => (   
                                                <>
                                                    <div key={i} className="flex flex-col items-center gap-1">
                                                        {ticket.ticketUrl && (
                                                            <img
                                                                src={ticket.ticketUrl}
                                                                alt={`${ticket.seat.row + ticket.seat.number} ticket`}
                                                                className="h-20 w-20 rounded object-cover border border-neutral-700"
                                                                onClick={() => chooseTicket(ticket.ticketUrl!)}
                                                            />
                                                        )}
                                                        <span className="text-[10px] text-neutral-400 font-semibold">
                                                            {ticket.seat.row + ticket.seat.number}
                                                        </span>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <ModalComponent 
                            style={{
                                top: "10%",
                                bottom: "10%",
                                left: '30%',
                                right: '30%',
                                backgroundColor: 'rgba(16, 24, 40)',
                            }}
                            openModal={openModal}
                            closeModal={closeModal}
                        >
                            <img
                                src={choosenTicket}
                                className="h-full w-full rounded object-cover border border-neutral-700"
                            />
                        </ModalComponent>
                        <div className="shrink-0 flex md:flex-col items-end justify-end">
                            <p className="text-xs text-neutral-500 font-medium">Total</p>
                            <p className="text-white text-lg font-bold ml-2 md:ml-0">
                                {booking.transaction[0].amount.toLocaleString()} VND
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {bookingHistory && bookingHistory.meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-6 pt-4 border-t border-neutral-700">
                <Page
                    totalPages={bookingHistory.meta.totalPages}
                    page={page}
                    pageGroup={pageGroup}
                    handleChoosePage={handleChoosePage}
                    incrementPageGroup={incrementPageGroup}
                    decrementPageGroup={decrementPageGroup}
                />
            </div>
            )}
        </div>
    )
}   