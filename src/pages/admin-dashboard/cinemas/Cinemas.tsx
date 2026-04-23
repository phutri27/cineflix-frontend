import * as cities from "@/hooks/admin/cinemas/use-city-cinema"
import ModalComponent from "@/components/modal/Modal"
import React, { useState } from "react"
import CinemasByCity from "./CinemasByCity"
import { ErrorMessages } from "@/utils/error-messages"
import { Plus } from "lucide-react"

const modalStyle = {
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '420px',
    width: '90%',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
}

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

export default function Cinemas() {
    const [modalIsOpen, setModal] = useState<boolean>(false)
    const [cityName, setCityName] = useState<string>('')
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingCityId, setEditingCityId] = useState<number | null>(null)

    const { data: admin_cities, isLoading, isError, error } = cities.useGetAdminCities()
    const { mutate: insertMutate, isPending: insertPending, isError: isInsertError, error: insertError } = cities.useInsertAdminCity()
    const { mutate: updateMutate, isPending: updatePending, isError: isUpdateError, error: updateError } = cities.useUpdateAdminCity()

    const openModal = () => setModal(true)

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
        if (isEditing && editingCityId !== null) {
            updateMutate({ cityId: editingCityId, name: cityName }, {
                onSuccess: () => closeModal()
            })
        } else {
            insertMutate(cityName, {
                onSuccess: () => closeModal()
            })
        }
    }

    if (isLoading) return <div className="p-6 text-neutral-400 text-sm">Loading...</div>
    if (isError) return <div className="p-6 text-red-500 text-sm">{error.message}</div>

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-neutral-400">
                    {admin_cities?.length || 0} {(admin_cities?.length || 0) !== 1 ? "cities" : "city"}
                </p>
                <button
                    onClick={openModal}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add City
                </button>
            </div>
            <ModalComponent openModal={modalIsOpen} closeModal={closeModal} style={modalStyle}>
                <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
                    {isEditing ? "Edit City" : "Add City"}
                </h2>

                {(isInsertError || isUpdateError) && (
                    <div className="mb-4">
                        <ErrorMessages error={insertError || updateError!} />
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            City Name
                        </label>
                        <input
                            type="text"
                            name="city_name"
                            id="city_name"
                            placeholder="Enter city name"
                            value={cityName}
                            onChange={handleInputChange}
                            className={inputClass}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isEditing ? updatePending : insertPending}
                        className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                    >
                        {isEditing
                            ? (updatePending ? "Updating..." : "Update")
                            : (insertPending ? "Saving..." : "Save")
                        }
                    </button>
                </form>
            </ModalComponent>
            {admin_cities && admin_cities.length === 0 && (
                <p className="text-neutral-500 text-sm text-center py-8">No cities added yet.</p>
            )}
            <div className="flex flex-col gap-3">
                {admin_cities?.map((city) => (
                    <CinemasByCity
                        key={city.id}
                        city={city}
                        openEditingModal={openEditingModal}
                    />
                ))}
            </div>
        </div>
    )
}