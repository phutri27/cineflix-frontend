import * as cities from "@/hooks/admin/cinemas/use-city-cinema"
import ModalComponent from "@/components/modal/Modal"
import React, { useState } from "react"
import CinemasByCity from "./CinemasByCity"
import { errorMessages } from "@/utils/error-messages"
import Error from "@/components/Error"
export default function Cinemas() {
    const [modalIsOpen, setModal] = useState<boolean>(false)
    const [cityName, setCityName] = useState<string>('')
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingCityId, setEditingCityId] = useState<number | null>(null)

    const { data: admin_cities, isLoading, isError, error } = cities.useGetAdminCities()
    const { mutate: insertMutate, isPending: insertPending, isError: isInsertError, error: insertError } = cities.useInsertAdminCity()
    const { mutate: updateMutate, isPending: updatePending, isError: isUpdateError, error: updateError } = cities.useUpdateAdminCity()

    let displayError: string | string[] = ""
    if (isInsertError || isUpdateError){
        displayError = errorMessages(insertError || updateError!)
    }

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
        setCityName("")
        setIsEditing(false)
        setEditingCityId(null)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value)
    }

    const openEditingModal = (cityId: number, cityName: string) => {
        setEditingCityId(cityId)
        setCityName(cityName)
        setIsEditing(true)
        setModal(true)
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        if (isEditing && editingCityId !== null){
            updateMutate({cityId: editingCityId, name: cityName}, {
                onSuccess: () => {
                    setModal(false)
                    setCityName("")
                    setIsEditing(false)
                    setEditingCityId(null)
                }
            })
        }
        else {
            insertMutate(cityName, {
                onSuccess: () => setModal(false)
            })
        }
    }

    if (isLoading){
        return <div>Loading...</div>
    }

    if (isError){
        return <div>{error.message}</div>
    }

    return (
        <>
            <div>
                <button onClick={openModal}>Add city</button>
            </div>
            <ModalComponent openModal={modalIsOpen} closeModal={closeModal}>
                {((isInsertError || isUpdateError) && Array.isArray(displayError)) 
                ? <Error errors={displayError}/> 
                : <div>{displayError}</div> }
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    name="city_name"
                    id="city_name"
                    placeholder="City name"
                    value={cityName}
                    onChange={handleInputChange}
                    />
                    {isEditing ? 
                    <button disabled={updatePending} type="submit">{updatePending ? "Updating..." : "Update"}</button> : 
                    <button disabled={insertPending} type="submit">{insertPending ? "Saving..." : "Save"}</button>}
                </form>
            </ModalComponent>
            {admin_cities?.map((city) => (
                <CinemasByCity 
                    key={city.id} 
                    city={city} 
                    openEditingModal={openEditingModal}
                />
            ))}
        </>
    )
}