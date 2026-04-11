import { useGetCinemaSpecificInfo } from "@/hooks/user/use-cinema";
import { useState } from "react";
import { format } from "date-fns";
import { createCalendar } from "@/utils/create-calendar";
import CinemaMovies from "./CinemaMovies";
export default function CinemaSpecificUser({pickedCinema, pickedCity}: 
    {pickedCinema: string, pickedCity: number}){
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toString())
    const [isTicketInfo, setTicketInfo] = useState<boolean>(false)

    const { data: cinema, isLoading, isFetched } = useGetCinemaSpecificInfo(
        pickedCity, 
        pickedCinema, 
        selectedDate, 
        {enabled: !!pickedCity && !!pickedCinema && !!selectedDate})

    const calendar = createCalendar()
    
    const selectDate = (date: Date) => {
        setSelectedDate(date.toString())
    }

    const movies = cinema?.movies
    if (isLoading){
        return <div>Loading..</div>
    }
    return (
        <>
            {isFetched && 
            <div>
                <div>{cinema?.name}</div>
                <div>
                    <p>{cinema?.address}</p>
                    <p>Hotline: {cinema?.hotline}</p>
                </div>
                <div>
                    <span onClick={() => setTicketInfo(false)}>Showtime</span>
                    <span onClick={() => setTicketInfo(true)}>Ticket</span>
                </div>
                {isTicketInfo ? (
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Seat type</td>
                                    <td>Price</td>
                                </tr>
                                {cinema?.seatType.map((st) => (
                                    <tr>
                                        <td>{st.seat_type}</td>
                                        <td>{st.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ): (
                    <div>
                        <div>
                            {calendar.map(c => (
                                <div onClick={() => selectDate(c)} className="border">
                                    {format(new Date(c), 'MM E dd')}
                                </div>
                            ))}
                        </div>
                        <CinemaMovies 
                        movies={movies!}
                        cinemaId={cinema?.id}/>
                    </div>
                )}
            </div>}
        </>
    )
}