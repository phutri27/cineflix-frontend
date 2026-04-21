import { useGetSpecificMovieAdmin, useGetAdminScreenByMovie } from "@/hooks";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import ModalComponent from "@/components/modal/Modal";
import ShowtimeForm from "./ShowtimeForm";
import { ErrorMessages } from "@/utils/error-messages";
import { format } from "date-fns";
import { ShowtimeDisplay } from "./ShowtimeDisplay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Plus, Monitor } from "lucide-react";

export interface SpecificCinemaMoviesProps {
    screenId: string;
    showtime: { time: string }[]
}

const modalStyle = {
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '520px',
    width: '90%',
    maxHeight: '85vh',
    overflow: 'auto',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
}

export default function SpecificCinemaMovies() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<string>("")
    const navigate = useNavigate()

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
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between mb-8 border-b border-neutral-700 pb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="h-9 w-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            Showtimes
                        </h1>
                    </div>
                    <button
                        onClick={handleCreateShowtime}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Create Showtime
                    </button>
                </div>
                {movieLoading && <p className="text-neutral-400">Loading movie...</p>}
                {isMovieError && <ErrorMessages error={movieError} />}
                {movie && (
                    <div className="flex items-center gap-4 bg-neutral-900/30 border border-neutral-800 rounded-xl p-5 mb-8">
                        <img
                            src={movie.posterUrl}
                            alt={`${movie.title} poster`}
                            className="h-24 w-16 rounded-lg object-cover shrink-0 border border-neutral-700"
                        />
                        <div>
                            <h2 className="text-lg font-bold text-white">{movie.title}</h2>
                            <p className="text-sm text-neutral-400 mt-1">{movie.durationMin} minutes</p>
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-6">
                    {screenLoading && <p className="text-neutral-400">Loading screens...</p>}
                    {isScreenError && <ErrorMessages error={screenError} />}

                    {screenByMovie?.map((screen) => {
                        const hasShowtimes = moviedate.some((dateString) =>
                            screen.showtimes.some((st) => format(st.startTime, "dd/MM/y") === dateString)
                        )

                        return (
                            <div
                                key={screen.id}
                                className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden"
                            >
                                <div className="flex items-center gap-2 px-5 py-4 border-b border-neutral-700">
                                    <Monitor className="h-4 w-4 text-neutral-500" />
                                    <h3 className="text-sm font-bold text-white">{screen.name}</h3>
                                </div>

                                <div className="p-5">
                                    {!hasShowtimes ? (
                                        <p className="text-sm text-neutral-500">No showtimes scheduled.</p>
                                    ) : (
                                        moviedate.map((dateString) => {
                                            const showtimesForDate = screen.showtimes.filter(
                                                (st) => format(st.startTime, "dd/MM/y") === dateString
                                            );
                                            if (showtimesForDate.length === 0) return null;
                                            return (
                                                <ShowtimeDisplay
                                                    key={dateString}
                                                    dateString={dateString}
                                                    showtimesForDate={showtimesForDate}
                                                    handleEdit={handleEdit}
                                                    cinemaId={cinemaId!}
                                                    movieId={movieId!}
                                                />
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <ModalComponent openModal={isModalOpen} closeModal={onCloseModal} style={modalStyle}>
                    <ShowtimeForm
                        cinemaId={cinemaId!}
                        movieId={movieId!}
                        showTimeEditId={editData}
                        onCloseModal={onCloseModal}
                    />
                </ModalComponent>
            </main>
            <Footer />
        </div>
    )
}