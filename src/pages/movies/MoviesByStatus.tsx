import { useMovie } from "@/hooks"
import { ErrorMessages } from "@/utils/error-messages"
import { useState } from "react"
import ModalComponent from "@/components/modal/Modal"
import Select from 'react-select'
import MovieList from "./MovieList"
import BookingScreen from "../booking/BookingScreen"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Film } from "lucide-react"
import { bookingMovieStyle } from "@/utils/modal-style"
interface MoviesByStatusProps {
    status: string
    title: string
    genre: string
}

export default function MoviesByStatus({status, title, genre} : MoviesByStatusProps) {
    const { data: movies, isError, isLoading, error } = useMovie(status, title, genre)
    const [selectedGenre, setSelectedGenre] = useState<string>("All")
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedMovie, setSelectedMovie] = useState<string>("")

    const defaultValue = {value: "", label: "All"}
    const genresName = Array.from(
        new Set(movies?.map((movie) => movie.genres.map((genre) => genre.name)).flat())
    )
    const genreSelect = genresName?.map((g) => ({value: g, label: g}))
    genreSelect?.unshift(defaultValue)

    const selectMovie = (movieId: string) => {
        setSelectedMovie(movieId)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const displayedMovies = selectedGenre === "All" || selectedGenre === "All Genres"
        ? movies 
        : movies?.filter((movie) => movie.genres.some(g => g.name === selectedGenre))

    if (isLoading) {
        return (
            <div className="bg-gray-950 min-h-screen text-white">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[2/3] bg-gray-800 rounded-2xl w-full"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="bg-gray-950 min-h-screen text-white">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <ErrorMessages error={error}/>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-950 min-h-screen text-gray-300 flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-gray-800 pb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider uppercase flex items-center">
                        <span className="w-2 h-8 bg-red-600 mr-3 rounded-full"></span>
                        {status === "coming" && "Coming Soon"}
                        {status === "showing" && "Now Showing"}
                        {status === "" && `Search results for: "${title}"`}
                    </h1>
                    <div className="w-full md:w-64">
                        <Select
                            defaultValue={defaultValue} 
                            onChange={(option) => setSelectedGenre(option?.label as string)}
                            options={genreSelect}
                            isSearchable={false}
                        />
                    </div>
                </div>
                {displayedMovies && displayedMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                        {displayedMovies.map(movie => (
                            <MovieList 
                                key={movie.id} 
                                movie={movie} 
                                genresName={movie.genres.map(g => g.name)}
                                onOpen={openModal}
                                selectMovie={selectMovie}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 flex flex-col items-center">
                        <Film className="w-16 h-16 text-gray-700 mb-4" />
                        <h2 className="text-xl text-gray-500 font-medium">No movies found</h2>
                        <p className="text-gray-600 mt-2">Try selecting a different genre.</p>
                    </div>
                )}
            </main>
            <ModalComponent style={bookingMovieStyle} openModal={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                <BookingScreen movieId={selectedMovie}/>
            </ModalComponent>
            <Footer />
        </div>
    )
}