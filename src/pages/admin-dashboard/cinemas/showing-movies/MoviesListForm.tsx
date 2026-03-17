import ModalComponent from "@/components/modal/Modal";
import { useGetMovieAdmin, useAdminInsertMovieInCinema } from "@/hooks";
import Select from 'react-select'
import { useState } from "react";
import { ErrorMessages } from "@/utils/error-messages";
interface MoviesListFormProps {
    cinemaId: string
    openModal: boolean
    onClose: () => void
    movies: string[]
}

interface SelectedMoviesProps {
    value: string
    label: string
    image: string
}
export default function MoviesListForm({ cinemaId, openModal, onClose, movies }: MoviesListFormProps) {
    const [selectedMovies, setSelectedMovies] = useState<SelectedMoviesProps[]>([])

    const { data: moviesData, isLoading, isError, error } = useGetMovieAdmin({enabled: openModal})
    const { mutate: insertMovieInCinema, isPending } = useAdminInsertMovieInCinema(cinemaId)

    const displayDataSelect = moviesData?.filter((movie) => !movies.includes(movie.id)).map((movie) => ({
        value: movie.id,
        label: movie.title,
        image: movie.posterUrl
    }))

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        const movies = selectedMovies.map(movie => movie.value)
        insertMovieInCinema({cinema_id: cinemaId, movieIds: movies},{
            onSuccess: () => onClose()
        })
    }

    return (
        <ModalComponent openModal={openModal} closeModal={onClose}>
            {isLoading && <p>Loading...</p>}
            {isError && <ErrorMessages error={error}/>}
            <form onSubmit={onSubmit}>
                <label htmlFor="movies">Movies</label>
                <Select
                    id="movies"
                    name="movies[]"
                    options={displayDataSelect}
                    formatOptionLabel={movie => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={movie.image} alt={movie.label} style={{ width: 50, marginRight: 10 }} />
                            <span>{movie.label}</span>
                        </div>
                    )}
                    onChange={(selectedOptions) => setSelectedMovies(selectedOptions as SelectedMoviesProps[])}
                    isMulti
                />      
                <button type="submit" disabled={isPending}>{isPending ?  "Saving..." : "Save"}</button>
            </form>
        </ModalComponent>
    )
}