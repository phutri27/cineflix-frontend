import type { MovieResponse } from "@/types/admin/movies/movie-type"
import { format } from "date-fns"
import { Film, Clock, CalendarDays } from 'lucide-react'
import { useNavigate } from "react-router"

interface MovieListProp {
    movie: MovieResponse
    genresName: string[]
    onOpen: () => void
    selectMovie: (movieId: string) => void
}
export default function MovieList({movie, genresName, onOpen, selectMovie}: MovieListProp){
    const navigate = useNavigate()

    const handleSpecificMovie = () => {
        navigate(`/default/movie/${movie.id}`)
    }

    const handleSelectMovie = () => {
        selectMovie(movie.id)
        onOpen()
    }

    return (
        <div>
            <div>
            <div 
                onClick={handleSpecificMovie}
                key={movie.id} 
                className="flex flex-col bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-gray-700 hover:-translate-y-1 transition-all duration-300 group h-full"
            >   
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-800">
                    <img 
                        src={movie.posterUrl} 
                        alt={`${movie.title} poster`} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-1.5 line-clamp-1" title={movie.title}>
                        {movie.title}
                    </h3>
                    <div className="flex items-start gap-1.5 mb-3">
                        <Film className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-400 line-clamp-2">
                            {genresName?.length > 0 ? genresName.join(", ") : "Uncategorized"}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4 mt-auto">
                        <div className="flex items-center justify-center text-gray-400 text-xs bg-gray-950/50 p-1.5 rounded-lg border border-gray-800/50">
                            <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-500" /> 
                            <span className="truncate">{movie.durationMin} min</span>
                        </div>
                        <div className="flex items-center justify-center text-gray-400 text-xs bg-gray-950/50 p-1.5 rounded-lg border border-gray-800/50">
                            <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                            <span className="truncate">{format(new Date(movie.premiereDate), 'dd/MM/yy')}</span>
                        </div>
                    </div>
                </div>
            </div>  
            <button 
                onClick={handleSelectMovie}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-2 px-3 rounded-xl transition-colors shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] active:scale-[0.98] mt-auto flex items-center justify-center gap-2"
            > 
                Book a ticket
            </button>
            </div>
        </div>
    )
}