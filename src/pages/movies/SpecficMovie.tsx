import { useParams } from "react-router";
import { useSpecificMovie } from "@/hooks";
import { format } from "date-fns";
import Header from "@/components/Header";
import ReactPlayer from 'react-player'
import ModalComponent from "@/components/modal/Modal";
import { useState } from "react";
import BookingScreen from "../booking/BookingScreen";
import { bookingMovieStyle } from "@/utils/modal-style";
import Footer from "@/components/Footer";

export default function SpecficMovie() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<"trailer" | "plot">("trailer")
    const { movie_id } = useParams()
        
    const { data: movie, isError, isLoading, error } = useSpecificMovie(movie_id!)

    const directorsName = movie?.directors.map((director) => director.name).join(", ")
    const actorsName = movie?.actors.map((actor) => actor.name).join(", ")
    const genresName = movie?.genres.map((genre) => genre.name).join(", ")

    const openModal = () => {
        setModalOpen(true)
    }

    if (isLoading) return (
        <div className="bg-[#141414] min-h-screen">
            <Header />
            <p className="text-neutral-400 text-center pt-20">Loading...</p>
        </div>
    )
    if (isError) return (
        <div className="bg-[#141414] min-h-screen">
            <Header />
            <p className="text-red-500 text-center pt-20">Error: {error.message}</p>
        </div>
    )

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans">
            <Header />

            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 border-b border-neutral-700 pb-6">
                    Movie Detail
                </h1>
                <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="shrink-0">
                        <img
                            src={movie?.posterUrl}
                            alt={`${movie?.title}'s poster`}
                            className="w-64 md:w-72 rounded-lg shadow-lg shadow-black/40 object-cover"
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="mb-5">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                                {movie?.title}
                            </h2>
                            <span className="inline-block mt-2 text-xs font-semibold bg-neutral-700 text-neutral-300 px-2 py-0.5 rounded">
                                {movie?.rated}
                            </span>
                        </div>
                        <div className="flex gap-4 text-sm mb-6">
                            <div className="flex flex-col gap-2 text-neutral-500 font-medium shrink-0">
                                <p>Directors</p>
                                <p>Actors</p>
                                <p>Genres</p>
                                <p>Premiere</p>
                                <p>Duration</p>
                            </div>
                            <div className="flex flex-col gap-2 text-neutral-200 font-semibold">
                                <p>{directorsName}</p>
                                <p>{actorsName}</p>
                                <p>{genresName}</p>
                                <p>{format(new Date(movie?.premiereDate as Date), 'dd/MM/y')}</p>
                                <p>{movie?.durationMin} minutes</p>
                            </div>
                        </div>
                        <div className="mt-auto flex justify-start">
                            <button
                                onClick={openModal}
                                className="px-6 py-3 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                Book a Ticket
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg overflow-hidden">
                    <div className="flex border-b border-neutral-700">
                        <button
                            onClick={() => setActiveTab("trailer")}
                            className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${
                                activeTab === "trailer"
                                    ? "text-red-500 border-b-2 border-red-500 bg-neutral-800/50"
                                    : "text-neutral-500 hover:text-neutral-300"
                            }`}
                        >
                            Trailer
                        </button>
                        <button
                            onClick={() => setActiveTab("plot")}
                            className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${
                                activeTab === "plot"
                                    ? "text-red-500 border-b-2 border-red-500 bg-neutral-800/50"
                                    : "text-neutral-500 hover:text-neutral-300"
                            }`}
                        >
                            Plot
                        </button>
                    </div>
                    <div className="p-6">
                        {activeTab === "trailer" ? (
                            <div className="aspect-video rounded overflow-hidden">
                                <ReactPlayer
                                    src={movie?.trailerUrl}
                                    playing={false}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        ) : (
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                {movie?.plot}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <ModalComponent 
            style={bookingMovieStyle} 
            openModal={isModalOpen} 
            closeModal={() => setModalOpen(false)}>
                <BookingScreen movieId={movie_id!}/>
            </ModalComponent>
            <Footer />
        </div>
    )
}