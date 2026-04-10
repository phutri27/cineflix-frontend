import { useParams } from "react-router";
import { useSpecificMovie } from "@/hooks";
import { format } from "date-fns";
import Header from "@/components/Header";
import ReactPlayer from 'react-player'
import ModalComponent from "@/components/modal/Modal";
import { useState } from "react";
import BookingScreen from "../booking/BookingScreen";
export default function SpecficMovie() {
    const [isModalOpen, setModalOpen] = useState(false)
    const { movie_id } = useParams()
        
    const { data: movie, isError, isLoading, error } = useSpecificMovie(movie_id!)

    const directorsName = movie?.directors.map((director) => director.name).join(", ")
    const actorsName = movie?.actors.map((actor) => actor.name).join(", ")
    const genresName = movie?.genres.map((genre) => genre.name).join(", ")

    const openModal = () => {
        setModalOpen(true)
    }

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>

    return (
        <div>
            <Header />
            <p>Movie Detail</p>
            <div>
                <img src={movie?.posterUrl} alt={`${movie?.title}'s poster`} />
                <div>
                    <div>
                        {movie?.title} 
                    </div>
                    <div>
                        <p>Directors: {directorsName}</p>
                        <p>Actors: {actorsName}</p>
                        <p>Genres: {genresName}</p>
                        <p>Premiere's date: {format(new Date(movie?.premiereDate as Date), 'dd/MM/y')}</p>
                        <p>Duration: {movie?.durationMin + " " + "minutes"}</p>
                        <p>Rated: {movie?.rated}</p>
                        <button onClick={openModal}>Book a ticket</button>
                    </div>
                    <div>
                        <p>Trailer</p>
                        <ReactPlayer
                            src={movie?.trailerUrl}
                            playing={false}
                            controls={true}
                        />
                    </div>
                    <div>
                        <p>Plot</p>
                        <p>{movie?.plot}</p>
                    </div>
                </div>
            </div>
            <ModalComponent openModal={isModalOpen} closeModal={() => setModalOpen(false)}>
                <BookingScreen movieId={movie_id!}/>
            </ModalComponent>
        </div>
    )
}