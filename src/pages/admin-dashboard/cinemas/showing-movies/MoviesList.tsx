import { useNavigate } from "react-router"
import { useState } from "react"
import { useAdminDeleteMovieInCinema } from "@/hooks"
import { ErrorMessages } from "@/utils/error-messages"
import MoviesListForm from "./MoviesListForm"
interface MoviesListProps {
    id: string
    title: string
    posterUrl: string
}
export default function MoviesList({ cinemaId, movies }: { cinemaId: string, movies: MoviesListProps[] }) {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { mutate: deleteMovieInCinema, isPending, isError, error } = useAdminDeleteMovieInCinema(cinemaId)

    const selectedMovies = movies.map((movie) => movie.id)

    const openModal = () => {
        setIsModalOpen(true);
    }

    const handleDeleteMovie = (id: string) => {
        deleteMovieInCinema({ cinema_id: cinemaId, movieId: id })
    }

    const handleEditShowtimes = (movieId: string) => {
        navigate(`/admin/cinemas/${cinemaId}/movies/${movieId}/showtimes`);
    }

    return (
        <div>
            {isError && <ErrorMessages error={error}/>}
            <button onClick={openModal}>Add movie</button>
            {movies.map((movie) => (
                <div key={movie.id} className="movie-item">
                    <div className="movie-info">
                        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
                        <h4>{movie.title}</h4>
                        <button onClick={() => handleEditShowtimes(movie.id)}>Edit</button>
                        <button onClick={() => handleDeleteMovie(movie.id)} disabled={isPending}>{isPending ? "Deleting..." : "Delete"}</button>
                    </div>
                </div>
            ))}
            <MoviesListForm movies={selectedMovies} cinemaId={cinemaId} openModal={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}