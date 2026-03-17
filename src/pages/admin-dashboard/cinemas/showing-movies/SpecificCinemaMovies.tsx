import { useGetSpecificMovieAdmin, useGetAdminScreenByMovie} from "@/hooks";
import { useState } from "react";
import { useParams } from "react-router";
import ModalComponent from "@/components/modal/Modal";
import ShowtimeForm from "./ShowtimeForm";
import { ErrorMessages } from "@/utils/error-messages";
export interface SpecificCinemaMoviesProps {
    screenId: string;
    showtime: { time: string }[]
}

export default function SpecificCinemaMovies() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<SpecificCinemaMoviesProps | null>(null)

    const { cinemaId, movieId } = useParams();

    const { data: movie, isLoading: movieLoading, isError: isMovieError, error: movieError } = useGetSpecificMovieAdmin(movieId!)
    const { data: screenByMovie, isLoading: screenLoading, isError: isScreenError, error: screenError } = useGetAdminScreenByMovie(cinemaId!, movieId!)

    const handleCreateShowtime = () => {
        setIsModalOpen(true);
    };

    const handleEditShowtime = (screenId: string, showtime: {time: string}[]) => {
        setEditData({screenId, showtime});
        setIsModalOpen(true);
    }

    const onCloseModal = () => {
        setIsModalOpen(false);
        setEditData(null)
    }

    return (
        <div>
            <h2>Specific Cinema Movies</h2>
            <button onClick={handleCreateShowtime}>Create Showtime</button>
            {movieLoading && <p>Loading movie...</p>}
            {isMovieError && <ErrorMessages error={movieError}/>}
            <div>
                <img src={movie?.posterUrl} alt={`${movie?.title} poster`} />
                <p>{movie?.title}</p>
                <p>{movie?.durationMin + " " + "minutes"}</p>
            </div>
            <div>
                {screenLoading && <p>Loading screens...</p>}
                {isScreenError && <ErrorMessages error={screenError}/>}
                {screenByMovie?.map((screen) => (
                    <div key={screen.id}>
                        <p>{screen.name}</p>
                        <div>
                            {screen.showtimes?.map((st) => (
                                <button key={st.id}>{st.startTime.toString()}</button>
                            ))}
                        </div>
                        <button onClick={() => handleEditShowtime(
                            screen.id,
                            screen.showtimes?.map((st) => ({time: st.startTime.toString().slice(0,16)})) || []
                        )}>Edit</button>
                    </div>
                ))}
            </div>
            <ModalComponent openModal={isModalOpen} closeModal={onCloseModal}>
                <ShowtimeForm
                    cinemaId={cinemaId!}
                    movieId={movieId!}
                    initialData={editData && screenByMovie ? {
                        screenId: editData.screenId,
                        showtimes: editData.showtime
                    } : undefined}
                    onCloseModal={onCloseModal} 
                />
            </ModalComponent>
        </div>
    )   
}