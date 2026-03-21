import { createCalendar } from "@/utils/create-calendar";
import { useGetCities } from "@/hooks/user/movies/use-city";
import { ErrorMessages } from "@/utils/error-messages";
import { format, parseISO } from 'date-fns'
import { useState } from "react";
import { useGetShowTime } from "@/hooks/user/movies/use-showtime";
export default function BookingScreen({movieId}: {movieId: string}) {
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [selectedCity, setSelectedCity] = useState<number | null>(null)

    const { data: showTimes, 
        isError: isShowtimeError, 
        isLoading: showtimeLoading, 
        error: showtimeError } = useGetShowTime(movieId, selectedDate, String(selectedCity))

    console.log(showTimes)
    const { data: cities, 
        isError: isCityError, 
        isLoading: cityLoading, 
        error: cityError } = useGetCities()
    
    const calendar = createCalendar()

    const selectDate = (date: Date) => {
        setSelectedDate(date.toISOString())
    }

    const selectCity = (cityId: number) => {
        setSelectedCity(cityId)
    }

    // if (isLoading) {
    //     return <p>Loading...</p>
    // }

    // if (isError) {
    //     return <p>Error: {<ErrorMessages error={error}/>}</p>
    // }
    return (
        <div>
            <div>
                {calendar.map(c => (
                    <div onClick={() => selectDate(c)} className="border">
                        {format(c, 'MM E dd')}
                    </div>
                ))}
            </div>
            <div>
                {cities?.map((city) => (
                    <div onClick={() => selectCity(city.id)} key={city.id}>
                        <h2>{city.name}</h2>
                    </div>
                ))}
            </div>
            {showTimes && (<div>
                {showTimes.map((showTime) => {
                const allStartTimes = showTime.showtimes.map(s => s.startTime)

                return  (
                    <div key={showTime.id}>
                        <p>{showTime.name}</p>
                        {allStartTimes.map((startTime, index) => (
                            <div key={index}>
                                <p>{startTime.toString().substring(11,16)}</p>
                            </div>
                        ))}
                    </div>
                )})
                }
            </div>)}
        </div>
    )
}   