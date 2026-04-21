import { useNavigate } from "react-router"
import { useState } from "react"
import { useAdminDeleteMovieInCinema } from "@/hooks"
import { ErrorMessages } from "@/utils/error-messages"
import MoviesListForm from "./MoviesListForm"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface MoviesListProps {
    id: string
    title: string
    posterUrl: string
}

export default function MoviesList({ cinemaId, movies }: { cinemaId: string, movies: MoviesListProps[] }) {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { mutate: deleteMovieInCinema, isPending, isError, error } = useAdminDeleteMovieInCinema(cinemaId)

    const selectedMovies = movies.map((movie) => movie.id)

    const handleDeleteMovie = (id: string) => {
        deleteMovieInCinema({ cinema_id: cinemaId, movieId: id })
    }

    const handleEditShowtimes = (movieId: string) => {
        navigate(`/admin/cinemas/${cinemaId}/movies/${movieId}/showtimes`)
    }

    return (
        <div>
            {isError && <div className="mb-3"><ErrorMessages error={error}/></div>}
            <div className="flex justify-end mb-3">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                    <Plus className="h-3 w-3" />
                    Add
                </button>
            </div>

            {movies.length === 0 ? (
                <p className="text-sm text-neutral-500 text-center py-4">No movies showing.</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-neutral-700/50 hover:bg-neutral-800/40 transition-colors"
                        >
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="h-12 w-8 rounded object-cover shrink-0 border border-neutral-700"
                            />
                            <span className="text-sm text-neutral-200 font-semibold flex-1 truncate">
                                {movie.title}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                                <button
                                    onClick={() => handleEditShowtimes(movie.id)}
                                    className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors"
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteMovie(movie.id)}
                                    disabled={isPending}
                                    className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-red-950/50 disabled:opacity-50 transition-colors"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <MoviesListForm movies={selectedMovies} cinemaId={cinemaId} openModal={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}