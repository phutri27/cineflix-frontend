import  { type CityResponse } from "@/api/admin/cinema/admin-city-api"
import { useDeleteAdminCity } from "@/hooks/admin/cinemas/use-city-cinema";
import * as cinemas from "@/hooks/admin/cinemas/use-admin-cinema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import ModalComponent from "@/components/modal/Modal";
import CinemaDetails from "./CinemaDetails";
import { errorMessages } from "@/utils/error-messages";
import Error from "@/components/Error";

interface CinemasByCityProps {
    city: CityResponse;
    openEditingModal: (cityId: number, cityName: string) => void;
}

interface CinemaFormData {
    name: string
    cityId: number
    address: string
    hotline: string
}

const emptyMsg = "field cannot be empty"
export default function CinemasByCity({city, openEditingModal}: CinemasByCityProps) {
    const [modalIsOpen, setModal] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingCinemaId, setEditingCinemaId] = useState<string>("")

    const { register, handleSubmit, reset, formState: { errors }} = useForm<CinemaFormData>({
        defaultValues:{
            name: "",
            address: "",
            hotline: ""
        }
    })
    
    const { mutate: deleteCity, isPending: cityPending } = useDeleteAdminCity()

    const { data: cinemaByCity, isLoading, isError: isGetError, error: getError } = cinemas.useGetAdminCinema(Number(city.id))
    const { mutate: insertCinema, isPending: insertCinemaPending, isError: isInsertError, error: insertError } = cinemas.useAdminInsertCinema()
    const { mutate: updateCinema, isPending: updateCinemaPending, isError: isUpdateError, error: updateError } = cinemas.useAdminUpdateCinema()

    let displayError: string | string[] = ""
    if (isInsertError || isUpdateError){
        displayError = errorMessages(insertError || updateError!)
        reset()
    }

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
        if (isEditing){
            setIsEditing(false)
            setEditingCinemaId("")
        }
        reset()
    }

    const handleEditingCity = () => {
        openEditingModal(city.id, city.name)
    }

    const handleDeleteCity = () => {
        deleteCity(city.id)
    }

    const handleEditingCinema = (cinemaId: string, cinemaName: string, cinemaAddress: string, cinemaHotline: string) => {
        setEditingCinemaId(cinemaId)
        setIsEditing(true)
        reset({
            name: cinemaName,
            address: cinemaAddress,
            hotline: cinemaHotline
        }, {keepDefaultValues: true})
        setModal(true)
    }

    const onSubmit: SubmitHandler<CinemaFormData> = (data: CinemaFormData) => {
        const completeData = {...data, cityId: city.id}
        if (isEditing){
            updateCinema({data: completeData, cinema_id: editingCinemaId}, {
                onSuccess: () => {
                    setModal(false)
                    setIsEditing(false)
                    setEditingCinemaId("")
                    reset()
                }
            })
        } else {
            insertCinema(completeData, {
            onSuccess: () => {
                setModal(false)
                reset()
            }
        })
        }
    }

    if (isGetError){
        return <div>{getError.message}</div>
    }

    if (isLoading){
        return <div>Loading...</div>
    }

    return (
        <details>
                <summary>
                    {city.name} ({cinemaByCity?.length ?? 0})
                    <button onClick={handleEditingCity}>Edit</button>
                    <button onClick={handleDeleteCity} disabled={cityPending}>{cityPending ? "Deleting..." : "Delete"}</button> 
                </summary>
            <div>
                <button onClick={openModal}>Add cinema</button>
                <ModalComponent openModal={modalIsOpen} closeModal={closeModal}>
                    <p>Create cinema</p>
                    {((isInsertError || isUpdateError) && Array.isArray(displayError)) 
                    ? <Error errors={displayError}/> 
                    : <div>{displayError}</div> }
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="hame">Name</label>
                            <input {...register("name", {required: `Name ${emptyMsg}`})} />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input {...register("address", {required: `Address ${emptyMsg}`})} />
                            {errors.address && <p>{errors.address.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="hotline">Hotline</label>
                            <input {...register("hotline", {required: `Hotline ${emptyMsg}`})} />
                            {errors.hotline && <p>{errors.hotline.message}</p>}
                        </div>
                        {isEditing 
                        ? <button type="submit" disabled={updateCinemaPending}>{updateCinemaPending ? "Updating" : "Update"}</button>
                        :<button type="submit" disabled={insertCinemaPending}>{insertCinemaPending ? "Saving..." : "Save"}</button>}
                    </form>
                </ModalComponent>
                {cinemaByCity?.map((cinema) => (
                    <CinemaDetails 
                        key={cinema.id}
                        cinema={cinema}
                        handleEditingCinema={handleEditingCinema}
                    />
                ))}
            </div>
        </details>
    )
}