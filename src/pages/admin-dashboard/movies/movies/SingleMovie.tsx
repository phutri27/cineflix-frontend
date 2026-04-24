import type { MovieResponse } from "@/types/admin/movies/movie-type";
import { useNavigate } from "react-router";
import { format } from 'date-fns'
import { useAdminMovie } from "@/hooks";
import { Pencil, Trash2, Power } from "lucide-react";

export default function SingleMovie({movie}: {movie: MovieResponse}) {
    const navigate = useNavigate()
    const { mutate: deleteMovie, isPending: deletePending } = useAdminMovie.useDeleteMovieAdmin()
    const { mutate: patchMovieStatus, isPending: patchPending} = useAdminMovie.usePatchMovieStatusAdmin()

    const onDelete = () => {
        deleteMovie(movie.id)
    }

    const onDeactivate = () => {
        patchMovieStatus({id: movie.id, isActive: false})
    }

    const handleEdit = () => {
        navigate(`/admin/edit-movie/${movie.id}`)
    }

    const existsBooking = movie.showtimes.find((st) => st._count.bookings > 0)
    const genres = movie.genres.map((genre) => genre.name)

    return(
        <div className="bg-neutral-800/40 border border-neutral-700 rounded-lg overflow-hidden group">
            <div className="relative">
                <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                        onClick={handleEdit}
                        className="h-10 w-10 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-400 transition-colors"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    {existsBooking ? 
                    <button 
                        className="h-10 w-10 rounded-full bg-neutral-800 border border-red-800 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-50 transition-colors"
                        disabled={patchPending}
                        onClick={onDeactivate}
                        title="Deactivate movie">
                        <Power className="h-4 w-4" />
                    </button> : 
                    <button 
                        onClick={onDelete} 
                        disabled={deletePending}
                        className="h-10 w-10 rounded-full bg-neutral-800 border border-red-800 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-50 transition-colors"
                        title="Delete movie"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>}
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-sm font-bold text-white mb-2 truncate">{movie.title}</h2>
                <div className="flex flex-wrap gap-1 mb-3">
                    {genres.map((genre, i) => (
                        <span 
                            key={i} 
                            className="text-[10px] bg-neutral-700/50 text-neutral-400 px-2 py-0.5 rounded"
                        >
                            {genre}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{movie.durationMin} min</span>
                    <span>{format(movie.premiereDate, 'dd/MM/y')}</span>
                </div>
            </div>
        </div>
    )
}