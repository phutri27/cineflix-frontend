import { useGetCinemaSpecificInfo } from "@/hooks/user/use-cinema";
import { useState } from "react";
import { format } from "date-fns";
import { createCalendar } from "@/utils/create-calendar";
import CinemaMovies from "./CinemaMovies";

export default function CinemaSpecificUser({pickedCinema, pickedCity}: 
    {pickedCinema: string, pickedCity: number}){
    
    const defaultDate = new Date()
    defaultDate.setHours(0, 0, 0 ,0)
    const [selectedDate, setSelectedDate] = useState<string>(defaultDate.toString())
    const [isTicketInfo, setTicketInfo] = useState<boolean>(false)

    const { data: cinema, isLoading, isFetched } = useGetCinemaSpecificInfo(
        pickedCity, 
        pickedCinema, 
        selectedDate, 
        {enabled: !!pickedCity && !!pickedCinema && !!selectedDate}
    )
    console.log(cinema)

    const calendar = createCalendar()
    
    const selectDate = (date: Date) => {
        setSelectedDate(date.toString())
    }

    const movies = cinema?.movies

    if (isLoading){
        return (
            <div className="w-full flex justify-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-neutral-400">Loading cinema details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            {isFetched && cinema && (
                <div className="flex flex-col">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-xl mb-8 shadow-lg">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            {cinema.name}
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-neutral-300 text-sm md:text-base">
                            <p className="flex items-center gap-2">
                                <span className="text-xl">📍</span> 
                                {cinema.address}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-xl">📞</span> 
                                Hotline: <span className="text-white font-bold tracking-wide">{cinema.hotline}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex border-b border-neutral-800 mb-8">
                        <button 
                            onClick={() => setTicketInfo(false)}
                            className={`py-3 px-6 font-semibold text-sm md:text-base transition-all duration-200 border-b-2 ${
                                !isTicketInfo 
                                ? 'border-red-600 text-white bg-red-600/5' 
                                : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50'
                            }`}
                        >
                            Showtimes
                        </button>
                        <button 
                            onClick={() => setTicketInfo(true)}
                            className={`py-3 px-6 font-semibold text-sm md:text-base transition-all duration-200 border-b-2 ${
                                isTicketInfo 
                                ? 'border-red-600 text-white bg-red-600/5' 
                                : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50'
                            }`}
                        >
                            Ticket Prices
                        </button>
                    </div>
                    {isTicketInfo ? (
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden animate-fade-in">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="bg-neutral-800 p-4 font-bold text-white uppercase tracking-wider text-sm border-b border-neutral-700">Seat Type</th>
                                        <th className="bg-neutral-800 p-4 font-bold text-white uppercase tracking-wider text-sm border-b border-neutral-700">Price (VND)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cinema.seatType.map((st, index) => (
                                        <tr key={index} className="hover:bg-neutral-800/50 transition-colors">
                                            <td className="p-4 border-b border-neutral-800 text-neutral-300 font-medium">
                                                {st.seat_type}
                                            </td>
                                            <td className="p-4 border-b border-neutral-800 text-white font-bold">
                                                {st.price.toLocaleString()} ₫
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="animate-fade-in flex flex-col gap-8">
                            <div className="w-full border-b border-neutral-800 pb-6">
                                <div className="flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                                    {calendar.map((c, index) => {
                                        const isSelected = selectedDate === c.toString();
                                        return (
                                            <div 
                                                key={index}
                                                onClick={() => selectDate(c)} 
                                                className={`snap-start flex-shrink-0 flex flex-col items-center justify-center w-16 md:w-20 py-2 md:py-3 rounded-lg border cursor-pointer transition-all duration-200 select-none ${
                                                    isSelected 
                                                    ? "border-red-600 bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]" 
                                                    : "border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500 hover:text-white"
                                                }`}
                                            >
                                                <span className="text-[10px] md:text-xs font-medium uppercase tracking-widest mb-0.5">
                                                    {format(new Date(c), 'MM')}
                                                </span>
                                                <span className={`text-2xl md:text-3xl font-black leading-none mb-0.5`}>
                                                    {format(new Date(c), 'dd')}
                                                </span>
                                                <span className="text-[10px] md:text-xs font-medium uppercase">
                                                    {format(new Date(c), 'EEE')}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <CinemaMovies 
                                movies={movies!}
                                cinemaId={cinema.id}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}