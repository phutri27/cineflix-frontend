import type { CityResponse } from "@/types/admin/cinema/city-type";
import { useAdminCity,useAdminCinema } from "@/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import ModalComponent from "@/components/modal/Modal";
import CinemaDetails from "./CinemaDetails";
import { ErrorMessages } from "@/utils/error-messages";
import { ChevronRight, Pencil, Trash2, Plus } from "lucide-react";

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

const modalStyle = {
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '480px',
    width: '90%',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
}

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

const emptyMsg = "field cannot be empty"

export default function CinemasByCity({city, openEditingModal}: CinemasByCityProps) {
    const [modalIsOpen, setModal] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingCinemaId, setEditingCinemaId] = useState<string>("")
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const { register, handleSubmit, reset, formState: { errors }} = useForm<CinemaFormData>({
        defaultValues: {
            name: "",
            address: "",
            hotline: ""
        }
    })
    
    const { mutate: deleteCity, isPending: cityPending } = useAdminCity.useDeleteAdminCity()
    const { data: cinemaByCity, isLoading, isError: isGetError, error: getError } = useAdminCinema.useGetAdminCinema(Number(city.id))
    const { mutate: insertCinema, isPending: insertCinemaPending, isError: isInsertError, error: insertError } = useAdminCinema.useAdminInsertCinema()
    const { mutate: updateCinema, isPending: updateCinemaPending, isError: isUpdateError, error: updateError } = useAdminCinema.useAdminUpdateCinema()

    const openModal = () => setModal(true)

    const closeModal = () => {
        setModal(false)
        if (isEditing) {
            setIsEditing(false)
            setEditingCinemaId("")
        }
        reset()
    }

    const handleEditingCity = (e: React.MouseEvent) => {
        e.stopPropagation()
        openEditingModal(city.id, city.name)
    }

    const handleDeleteCity = (e: React.MouseEvent) => {
        e.stopPropagation()
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
        if (isEditing) {
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

    if (isGetError) return <div className="p-4 text-red-500 text-sm">{getError.message}</div>
    if (isLoading) return <div className="p-4 text-neutral-400 text-sm">Loading...</div>

    return (
        <div className="bg-neutral-800/40 border border-neutral-700 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-800/60 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <ChevronRight className={`h-4 w-4 text-neutral-500 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                    }`} />
                    <span className="text-sm font-bold text-white">{city.name}</span>
                    <span className="text-xs text-neutral-500 font-medium">
                        ({cinemaByCity?.length ?? 0} cinema{(cinemaByCity?.length ?? 0) !== 1 && "s"})
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleEditingCity}
                        className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={handleDeleteCity}
                        disabled={cityPending}
                        className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-red-950/50 disabled:opacity-50 transition-colors"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </button>
            {isExpanded && (
                <div className="border-t border-neutral-700">
                    <div className="px-4 py-3 flex justify-end">
                        <button
                            onClick={openModal}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                        >
                            <Plus className="h-3.5 w-3.5" />
                            Add Cinema
                        </button>
                    </div>

                    {cinemaByCity && cinemaByCity.length > 0 ? (
                        <div className="flex flex-col">
                            {cinemaByCity.map((cinema) => (
                                <CinemaDetails
                                    key={cinema.id}
                                    cinema={cinema}
                                    handleEditingCinema={handleEditingCinema}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="px-4 pb-4 text-sm text-neutral-500">No cinemas in this city.</p>
                    )}
                </div>
            )}
            <ModalComponent openModal={modalIsOpen} closeModal={closeModal} style={modalStyle}>
                <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
                    {isEditing ? "Edit Cinema" : "Add Cinema"}
                </h2>

                {((isInsertError || isUpdateError) && (
                    <div className="mb-4 text-red-500">
                        <ErrorMessages error={insertError || updateError!} />
                    </div>
                ))}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                        <input 
                            className={inputClass}
                            placeholder="Cinema name"
                            {...register("name", {required: `Name ${emptyMsg}`})} 
                        />
                        {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Address</label>
                        <input 
                            className={inputClass}
                            placeholder="Cinema address"
                            {...register("address", {required: `Address ${emptyMsg}`})} 
                        />
                        {errors.address && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.address.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Hotline</label>
                        <input 
                            className={inputClass}
                            placeholder="Hotline number"
                            {...register("hotline", {required: `Hotline ${emptyMsg}`})} 
                        />
                        {errors.hotline && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.hotline.message}</p>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={isEditing ? updateCinemaPending : insertCinemaPending}
                        className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                    >
                        {isEditing
                            ? (updateCinemaPending ? "Updating..." : "Update")
                            : (insertCinemaPending ? "Saving..." : "Save")
                        }
                    </button>
                </form>
            </ModalComponent>
        </div>
    )
}