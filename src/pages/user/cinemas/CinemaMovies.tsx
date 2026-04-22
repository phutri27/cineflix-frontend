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

    const handleMovieDetail = (movieId: string) => {
        navigate(`/default/movie/${movieId}`)
    }

    if (!movies || movies.length === 0) {
    return (
        <div className="text-center py-10 text-neutral-500 border border-neutral-800 rounded-xl bg-neutral-900/20">
            No showtimes available for this date.
        </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            {movies.map((movie) => (
                <div key={movie.id} className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-5 border-b border-neutral-800 pb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-1">{movie.title}</h3>
                        <span className="bg-neutral-700 text-neutral-200 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded border border-neutral-600 shrink-0 uppercase tracking-wide">
                            {movie.rated}
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-28 sm:w-36 shrink-0">
                            <img 
                                src={movie.posterUrl} 
                                alt={movie.title} 
                                className="w-full h-auto object-cover rounded-lg shadow-md border border-neutral-800 cursor-pointer"
                                onClick={() => handleMovieDetail(movie.id)}
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-neutral-400 mb-3 uppercase tracking-widest">
                                Select Showtime
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {movie.showtimes && movie.showtimes.length > 0 ? (
                                    movie.showtimes.map((st)=> (
                                        <button 
                                            key={st.id}
                                            onClick={() => handleBooking(st.id)}
                                            className="px-5 py-2 border border-neutral-700 bg-neutral-900 text-neutral-300 rounded-md transition-all duration-200 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] font-medium text-sm sm:text-base min-w-[80px]"
                                        >
                                            {format(new Date(st.startTime), "HH:mm")}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-neutral-500 text-sm italic">No more showtimes for this movie today.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
