import { useMovie } from "@/hooks"
import { ErrorMessages } from "@/utils/error-messages"
import { useState } from "react"
import ModalComponent from "@/components/modal/Modal"
import Select from 'react-select'
import MovieList from "./MovieList"
import BookingScreen from "../booking/BookingScreen"

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
    const genresName = movies?.map((movie) => movie.genres.map((genre) => genre.name)).flat()
    const genreSelect = genresName?.map((g) => ({value: g, label: g}))
    genreSelect?.unshift(defaultValue)

    const selectMovie = (movieId: string) => {
        setSelectedMovie(movieId)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error: {<ErrorMessages error={error}/>}</p>
    }
    return (
        <div>
            <div>
                  <p>{status === "coming" ? "Coming Movies" : "Showing Movies"}</p>
                  <Select
                    defaultValue={defaultValue} 
                    onChange={(option) => setSelectedGenre(option?.label as string)}
                    options={genreSelect}
                  />
            </div>
            <div>
                {selectedGenre === "All" ? (
                    movies?.map(movie => (
                    <MovieList 
                    key={movie.id} 
                    movie={movie} 
                    genresName={genresName!}
                    onOpen={openModal}
                    selectMovie={selectMovie}/>
                ))
                ) : (
                    movies?.filter((movie) => (movie.genres.some(g => g.name === selectedGenre)))
                    .map(movie => (
                        <MovieList 
                        key={movie.id} 
                        movie={movie} 
                        genresName={genresName!}
                        onOpen={openModal}
                        selectMovie={selectMovie}/>
                    ))
                )}
            </div>
            <ModalComponent openModal={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                <BookingScreen movieId={selectedMovie}/>
            </ModalComponent>
        </div>
    )
}