import ModalComponent from "@/components/modal/Modal";
import { useAdminMovie, useAdminCinema } from "@/hooks";
import Select from 'react-select'
import { useState } from "react";
import { ErrorMessages } from "@/utils/error-messages";
import { darkSelectEditStyles } from "@/utils/react-select-style";

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

const modalStyle = {
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '520px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
}

export default function MoviesListForm({ cinemaId, openModal, onClose, movies }: MoviesListFormProps) {
    const [selectedMovies, setSelectedMovies] = useState<SelectedMoviesProps[]>([])

    const { data: moviesData, isLoading, isError, error } = useAdminMovie.useGetMovieAdmin({ enabled: openModal })
    const { mutate: insertMovieInCinema, isPending } = useAdminCinema.useAdminInsertMovieInCinema(cinemaId)

    const displayDataSelect = moviesData?.filter((movie) => !movies.includes(movie.id)).map((movie) => ({
        value: movie.id,
        label: movie.title,
        image: movie.posterUrl
    }))

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        const movies = selectedMovies.map(movie => movie.value)
        insertMovieInCinema({ cinema_id: cinemaId, movieIds: movies }, {
            onSuccess: () => onClose()
        })
    }

    return (
        <ModalComponent openModal={openModal} closeModal={onClose} style={modalStyle}>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
                Add Movies to Cinema
            </h2>

            {isLoading && <p className="text-neutral-400 text-sm">Loading movies...</p>}
            {isError && <div className="mb-4"><ErrorMessages error={error} /></div>}

            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Movies</label>
                    <Select
                        id="movies"
                        name="movies[]"
                        options={displayDataSelect}
                        formatOptionLabel={movie => (
                            <div className="flex items-center gap-3">
                                <img
                                    src={movie.image}
                                    alt={movie.label}
                                    className="h-10 w-7 rounded object-cover shrink-0"
                                />
                                <span className="text-sm font-medium">{movie.label}</span>
                            </div>
                        )}
                        onChange={(selectedOptions) => setSelectedMovies(selectedOptions as SelectedMoviesProps[])}
                        isMulti
                        placeholder="Search and select movies..."
                        styles={darkSelectEditStyles}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isPending || selectedMovies.length === 0}
                    className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isPending ? "Saving..." : "Save"}
                </button>
            </form>
        </ModalComponent>
    )
}