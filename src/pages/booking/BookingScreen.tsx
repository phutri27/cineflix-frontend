import { createCalendar } from "@/utils/create-calendar";
import { useGetCities } from "@/hooks/user/movies/use-city";
import { ErrorMessages } from "@/utils/error-messages";
import { format } from 'date-fns'
import { useState } from "react";
import { useGetShowTime } from "@/hooks/user/movies/use-showtime";
import SpecficTimeSeat from "./SpecficTimeSeat";

export default function BookingScreen({movieId}: {movieId: string}) {
    const [selectedDate, setSelectedDate] = useState<string>("")
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
        <div>
            <div>
                {calendar.map(c => (
                    <div onClick={() => selectDate(c)} className="border">
                        {format(new Date(c), 'MM E dd')}
                    </div>
                ))}
            </div>
            <div>
                {cityLoading && <p>Loading cities...</p>}
                {isCityError && <ErrorMessages error={cityError}/>}
                {cities?.map((city) => (
                    <div onClick={() => selectCity(city.id)} key={city.id}>
                        <h2>{city.name}</h2>
                    </div>
                ))}
            </div>
            {showtimeLoading && <p>Loading showtimes...</p>}
            {isShowtimeError && <ErrorMessages error={showtimeError}/>}
            {showTimes && (<div>
                {showTimes.map((showTime) => (
                    <SpecficTimeSeat key={showTime.id} showTime={showTime}/>
                ))}
            </div>)}
        </div>
    )
}   