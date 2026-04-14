import { createCalendar } from "@/utils/create-calendar";
import { useGetCities } from "@/hooks/user/movies/use-city";
import { ErrorMessages } from "@/utils/error-messages";
import { format } from 'date-fns'
import { useState } from "react";
import { useGetShowTime } from "@/hooks/user/movies/use-showtime";
import SpecficTimeSeat from "./SpecficTimeSeat";

export default function BookingScreen({movieId}: {movieId: string}) {
    const defaultDate = new Date()
    defaultDate.setHours(0, 0, 0 ,0)
    const [selectedDate, setSelectedDate] = useState<string>(defaultDate.toString())
    const [selectedCity, setSelectedCity] = useState<number | null>(null)

    const { data: showTimes, 
        isError: isShowtimeError, 
        isLoading: showtimeLoading, 
        error: showtimeError } = useGetShowTime(movieId, selectedDate, String(selectedCity))

    const { data: cities, 
        isError: isCityError, 
        isLoading: cityLoading, 
        error: cityError } = useGetCities()
    
    const calendar = createCalendar()
    
    const selectDate = (date: Date) => {
        setSelectedDate(date.toString())
    }

    const selectCity = (cityId: number) => {
        setSelectedCity(cityId)
    }

    return (
        <div className="flex flex-col w-full bg-gray-900 text-gray-200 h-full">
            <div className="w-full border-b border-gray-800 pb-4 pt-2">
                <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {calendar.map((c, index) => {
                        const isSelected = selectedDate === c.toString();
                        return (
                            <div 
                                key={index}
                                onClick={() => selectDate(c)} 
                                className={`snap-start flex-shrink-0 flex flex-col items-center justify-center w-16 sm:w-20 py-2 sm:py-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                                    isSelected 
                                    ? "border-red-600 bg-red-600/10 text-white shadow-[0_0_10px_rgba(220,38,38,0.2)]" 
                                    : "border-gray-800 bg-gray-900/50 text-gray-500 hover:border-gray-600 hover:text-gray-300"
                                }`}
                            >
                                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest mb-0.5">
                                    {format(new Date(c), 'MM')}
                                </span>
                                <span className={`text-2xl sm:text-3xl font-black leading-none mb-0.5 ${isSelected ? "text-red-500" : ""}`}>
                                    {format(new Date(c), 'dd')}
                                </span>
                                <span className="text-[10px] sm:text-xs font-medium uppercase">
                                    {format(new Date(c), 'EEE')}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="py-4 border-b border-gray-800">
                {cityLoading && <p className="text-sm text-gray-500 animate-pulse">Loading cities...</p>}
                {isCityError && <ErrorMessages error={cityError}/>}
                
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {cities?.map((city) => {
                        const isSelected = selectedCity === city.id;
                        return (
                            <button 
                                onClick={() => selectCity(city.id)} 
                                key={city.id}
                                className={`px-4 py-2 text-xs sm:text-sm rounded-md border font-medium transition-colors ${
                                    isSelected 
                                    ? "bg-white text-black border-white" 
                                    : "bg-transparent text-gray-400 border-gray-800 hover:border-gray-500 hover:text-white"
                                }`}
                            >
                                {city.name}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className="py-6 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700">
                {!selectedCity && !cityLoading && (
                    <div className="text-center py-10 text-gray-600 flex flex-col items-center">
                        <span className="text-4xl mb-2">📍</span>
                        <p>Please select a city to view available cinemas.</p>
                    </div>
                )}
                {showtimeLoading && <p className="text-sm text-gray-500 animate-pulse text-center py-10">Loading showtimes...</p>}
                {showTimes && showTimes.length > 0 && (
                    <div className="flex flex-col gap-8">
                        {showTimes.map((showTime) => (
                            <SpecficTimeSeat key={showTime.id} showTime={showTime}/>
                        ))}
                    </div>
                )}
                {showTimes && showTimes.length === 0 && selectedCity && !showtimeLoading && (
                    <div className="text-center py-10 text-gray-600">
                        <p>No showtimes available for this date in the selected city.</p>
                    </div>
                )}
            </div>
        </div>
    )
}   