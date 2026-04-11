import { useGetSpecificMovieAdmin, useGetAdminScreenByMovie} from "@/hooks";
import { useState } from "react";
import { useParams } from "react-router";
import ModalComponent from "@/components/modal/Modal";
import ShowtimeForm from "./ShowtimeForm";
import { ErrorMessages } from "@/utils/error-messages";
import { format } from "date-fns";
import {ShowtimeDisplay}  from "./ShowtimeDisplay";

export interface SpecificCinemaMoviesProps {
    screenId: string;
    showtime: { time: string }[]
}

export default function SpecificCinemaMovies() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<string>("")

    const { cinemaId, movieId } = useParams();

    const { data: movie, isLoading: movieLoading, isError: isMovieError, error: movieError } = useGetSpecificMovieAdmin(movieId!)
    const { data: screenByMovie, isLoading: screenLoading, isError: isScreenError, error: screenError } = useGetAdminScreenByMovie(cinemaId!, movieId!)

    const handleCreateShowtime = () => {
        setIsModalOpen(true);
    };

    const allShowtimes = screenByMovie?.flatMap((screen) => screen.showtimes) || [];
    const globallySortedShowtimes = allShowtimes.sort((a, b) => {
        const timeA = new Date(a.startTime).getTime();
        const timeB = new Date(b.startTime).getTime();
        return timeA - timeB;
    });

    const moviedate = [...new Set(globallySortedShowtimes.map((st) => format(st.startTime, "dd/MM/y")))];

    const handleEdit = (id: string) => {
        setIsModalOpen(true);
        setEditData(id)
    }

    const onCloseModal = () => {
        setIsModalOpen(false);
        setEditData("")
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
                        {moviedate.map((dateString) => {
                            const showtimesForDate = screen.showtimes.filter(
                                (st) => format(st.startTime, "dd/MM/y") === dateString
                            );
                            if (showtimesForDate.length === 0) return null;
                            return <ShowtimeDisplay 
                            dateString={dateString} 
                            showtimesForDate={showtimesForDate} 
                            handleEdit={handleEdit}
                            cinemaId={cinemaId!}
                            movieId={movieId!}/>
                        })}
                    </div>
                ))}
            </div>
            <ModalComponent openModal={isModalOpen} closeModal={onCloseModal}>
                <ShowtimeForm
                    cinemaId={cinemaId!}
                    movieId={movieId!}
                    showTimeEditId={editData}
                    onCloseModal={onCloseModal} 
                />
            </ModalComponent>
        </div>
    )   
}