import type { MovieResponse } from "@/types/admin/movies/movie-type";
import { format } from 'date-fns'
import { useAdminMovie } from "@/hooks";
import { Power } from "lucide-react";

export default function ArchiveMovie({movie}: {movie: MovieResponse}) {
    const { mutate: patchMovieStatus, isPending: patchPending} = useAdminMovie.usePatchMovieStatusAdmin()

    const onActivate = () => {
        patchMovieStatus({id: movie.id, isActive: true})
    }

    const genres = movie.genres.map((genre) => genre.name)

    return(
        <div className="bg-neutral-800/40 border border-neutral-700 rounded-lg overflow-hidden group relative">
            <div className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-950/70 px-2 py-0.5 rounded">
                Inactive
            </div>

            <div className="opacity-40 grayscale">
                <div className="relative">
                    <img 
                        src={movie.posterUrl} 
                        alt={movie.title} 
                        className="w-full h-64 object-cover"
                    />
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
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                    className="h-10 w-10 rounded-full bg-neutral-800 border border-green-800 flex items-center justify-center text-green-500 hover:bg-green-600 hover:text-white hover:border-green-600 disabled:opacity-50 transition-colors"
                    disabled={patchPending}
                    onClick={onActivate}
                    title="Reactivate movie"
                >
                    <Power className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}