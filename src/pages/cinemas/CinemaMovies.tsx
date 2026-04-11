import { format } from "date-fns";
import { useNavigate } from "react-router";
interface CinemaMovieProps{
    id: string
    title: string;
    posterUrl: string;
    rated: string;
    showtimes: {
        id: string;
        startTime: Date;
        screen: {
            name: string;
        };
    }[];
}

export default function CinemaMovies({movies, cinemaId}: {movies: CinemaMovieProps[], cinemaId: string | undefined}){
    const navigate = useNavigate()
    const handleBooking = (showTimeId: string) => {
        navigate(`/default/cinema/${cinemaId}/booking/ticket/${showTimeId}`)
    }
    return (
        <div>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <div>
                        <p>{movie.title}</p>
                        <span>{movie.rated}</span>
                    </div>
                    <div>
                        <img src={movie.posterUrl} alt= {movie.title} />
                        <div>
                            {movie.showtimes.map((st)=> (
                                <button onClick={() => handleBooking(st.id)}>{format(st.startTime, "HH:mm")}</button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )   
}
