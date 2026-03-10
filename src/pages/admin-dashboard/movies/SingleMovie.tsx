import type { MovieResponse } from "@/api/admin/types/movie-response";
import { useNavigate } from "react-router";
import { format } from 'date-fns'
import { useDeleteMovieAdmin } from "@/hooks";
export default function SingleMovie({movie}: {movie: MovieResponse}) {
    const navigate = useNavigate()

    const { mutate, isPending,  } = useDeleteMovieAdmin()

    const onDelete = () => {
        mutate(movie.id)
    }

    const handleEdit = () => {
        navigate(`/admin/edit-movie/${movie.id}`)
    }

    const genres = movie.genres.map((genre) => genre.name)
    return(
        <div className="flex flex-col items-center gap-4">
            <img src={movie.posterUrl} alt={movie.title} className="w-48 h-auto rounded-md" />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p><b>Genres: </b>{genres.join(', ')}</p>
            <p><b>Duration: </b> {movie.durationMin + "minutes"}</p>
            <p><b>Premiere date:</b> {format(movie.premiereDate, 'dd/MM/y')}</p>
            <button onClick={handleEdit} >Edit</button> 
            <button onClick={onDelete} disabled={isPending}>{isPending ? "Deleting..." : "Delete"}</button>
        </div>
    )
}