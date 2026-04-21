import SingleMovie from "./SingleMovie"
import { useGetMovieAdmin, useInsertMovieAdmin, useGetGenresAdmin } from "@/hooks"
import ModalComponent from "../../../../components/modal/Modal"
import { useModalStore } from "../../../../components/modal/modal-store"
import { type SubmitHandler } from "react-hook-form"
import { type MovieFormInput } from "@/api"
import MovieForm from "@/components/forms/MovieForm"
import { movieData } from "@/components/helper/movie-submit-helper"
import Select from "react-select"
import { useState } from "react"
import { ErrorMessages } from "@/utils/error-messages"
import { Plus } from "lucide-react"
import { darkSelectGenreStyle } from "@/utils/react-select-style"

const modalStyle = {
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '600px',
    maxHeight: '85vh',
    overflow: 'auto',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
}

export default function Movie(){
    const {data: admin_movies, isLoading, isError, error} = useGetMovieAdmin()
    const {data: genres} = useGetGenresAdmin()
    const { mutate, isPending, isError: isInsertError, error: insertError } = useInsertMovieAdmin()

    const [selectedGenre, setSelectedGenre] = useState<string>("All")

    const modalIsOpen = useModalStore(state => state.modalIsOpen)
    const openModal = useModalStore(state => state.openModal)
    const closeModal = useModalStore(state => state.closeModal) 

    const defaultGenreValues = {value: "sss", label: "All"}
    const optionGenres = genres?.map((genre) => ({value: genre.id, label: genre.name}))
    optionGenres?.unshift(defaultGenreValues)

    const onSubmit: SubmitHandler<MovieFormInput> = (data) => {
        const formData = movieData(data)
        mutate(formData, {
            onSuccess: () => closeModal()
        });
    }

    if (isError){
        return <div className="p-6 text-red-500">{error.message}</div>
    }

    if(isLoading) {
        return <div className="p-6 text-neutral-400">Loading...</div>
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="w-64">
                    <Select
                        defaultValue={defaultGenreValues}
                        onChange={(option) => setSelectedGenre(option?.label as string)}
                        options={optionGenres}
                        styles={darkSelectGenreStyle}
                    />
                </div>
                <button 
                    onClick={openModal}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add Movie
                </button>
            </div>

            <ModalComponent
                openModal={modalIsOpen}
                closeModal={closeModal}
                style={modalStyle}
            >
                {isInsertError && (
                    <div className="mb-4">
                        <ErrorMessages error={insertError!}/>
                    </div>
                )}
                <MovieForm 
                    isPending={isPending} 
                    onSubmit={onSubmit}
                    admin_genres={genres}
                />
            </ModalComponent>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedGenre === "All" ? 
                (admin_movies?.map(movie => (
                    <SingleMovie key={movie.id} movie={movie} />
                ))) : (admin_movies?.filter(movie => (movie.genres.some(m => m.name === selectedGenre)))
                    .map(movie => (
                    <SingleMovie key={movie.id} movie={movie} />
                )))}
            </div>
        </div>
    )
}