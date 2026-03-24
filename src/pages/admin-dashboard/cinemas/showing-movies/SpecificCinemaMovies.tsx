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
    const [editData, setEditData] = useState<SpecificCinemaMoviesProps | null>(null)

    const { cinemaId, movieId } = useParams();

    const { data: movie, isLoading: movieLoading, isError: isMovieError, error: movieError } = useGetSpecificMovieAdmin(movieId!)
    const { data: screenByMovie, isLoading: screenLoading, isError: isScreenError, error: screenError } = useGetAdminScreenByMovie(cinemaId!, movieId!)

    const handleCreateShowtime = () => {
        setIsModalOpen(true);
    };

    const allShowtimes = screenByMovie?.flatMap((screen) => screen.showtimes) || [];
    const globallySortedShowtimes = allShowtimes.sort((a, b) => {
        const timeA = new Date(a.startTime.toString().replace("Z", "")).getTime();
        const timeB = new Date(b.startTime.toString().replace("Z", "")).getTime();
        return timeA - timeB;
    });

    const moviedate = [...new Set(globallySortedShowtimes.map((st) => format(new Date(st.startTime.toString().replace("Z", "")), "dd/MM/y")))];
    
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
                        {moviedate.map((dateString) => {
                            const showtimesForDate = screen.showtimes.filter(
                                (st) => format(st.startTime.toString().replace("Z", ""), "dd/MM/y") === dateString
                            );
                            if (showtimesForDate.length === 0) return null;
                            return <ShowtimeDisplay dateString={dateString} showtimesForDate={showtimesForDate} />
                        })}
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