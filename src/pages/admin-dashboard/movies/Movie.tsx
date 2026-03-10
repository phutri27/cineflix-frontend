import SingleMovie from "./SingleMovie"
import { useGetMovieAdmin, useInsertMovieAdmin } from "@/hooks"
import ModalComponent from "../../../components/modal/Modal"
import { useModalStore } from "../../../components/modal/modal-store"
import { type SubmitHandler } from "react-hook-form"
import { type MovieFormInput } from "@/api"
import MovieForm from "@/components/forms/MovieForm"
import { movieData } from "@/components/helper/movie-submit-helper"
import { useState } from "react"
export default function Movie(){
    const {data: admin_movies, isLoading, isError, error} = useGetMovieAdmin()
    
    const { mutate, isPending } = useInsertMovieAdmin()

    const modalIsOpen = useModalStore(state => state.modalIsOpen)
    const openModal = useModalStore(state => state.openModal)
    const closeModal = useModalStore(state => state.closeModal) 

    const onSubmit: SubmitHandler<MovieFormInput> = (data) => {
        const formData = movieData(data)
        mutate(formData, {
            onSuccess: () => closeModal()
        });
    }

    if(isLoading) {
        
        return <div>Loading...</div>
    }

    return (
        <div>
            {isError && <div>{error.message}</div>}
            <button onClick={openModal}>Add movie</button>
            <ModalComponent
                openModal={modalIsOpen}
                closeModal={closeModal}
            >
                <MovieForm isPending={isPending} onSubmit={onSubmit}/>
            </ModalComponent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {admin_movies?.map(movie => (
                    <SingleMovie key={movie.id} 
                    movie={movie} 
                    />
                ))}
            </div>
        </div>
    )
}