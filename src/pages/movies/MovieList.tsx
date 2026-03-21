import type { MovieResponse } from "@/api/admin/types/movie-response"
import { format } from "date-fns"

interface MovieListProp {
    movie: MovieResponse
    genresName: string[]
    onOpen: () => void
    selectMovie: (movieId: string) => void
}
export default function MovieList({movie, genresName, onOpen, selectMovie}: MovieListProp){
    const handleSelectMovie = () => {
        selectMovie(movie.id)
        onOpen()
    }

    return (
        <div key={movie.id}>
            <img src={movie.posterUrl} alt={`${movie.title} poster`} />
            <div>
                <p>Genres: {genresName?.join(", ")}</p>
                <p>Duration: {movie.durationMin}</p>
                <p>Premire date: {format(movie.premiereDate, 'dd/MM/y')}</p>
            </div>
            <button onClick={handleSelectMovie}>Book a ticket</button>
        </div>
    )
}