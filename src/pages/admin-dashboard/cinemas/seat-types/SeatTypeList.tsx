import { useInsertAdminSeatType, useUpdateAdminSeatType, useDeleteAdminSeatType } from "@/hooks/admin/cinemas/use-admin-seat-type"
import ModalComponent from "@/components/modal/Modal"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { useState } from "react"
import Select from 'react-select'
import { ErrorMessages } from "@/utils/error-messages"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { darkSelectGenreStyle } from "@/utils/react-select-style"

interface SeatTypeProp {
    seat_type: {value: string, label: string}, 
    price: number
}

const emptyMsg = 'field cannot be empty'

const options = [
    {value: "VIP", label: "VIP"},
    {value: "REGULAR", label: "REGULAR"},
    {value: "COUPLE", label: "COUPLE"},
    {value: "EMPTY", label: "EMPTY"}
]

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

const seatTypeColors: Record<string, string> = {
    VIP: "bg-green-900/30 border-green-700 text-green-400",
    REGULAR: "bg-red-900/30 border-red-700 text-red-400",
    COUPLE: "bg-fuchsia-900/30 border-fuchsia-700 text-fuchsia-400",
    EMPTY: "bg-neutral-800/50 border-neutral-600 text-neutral-400",
}

export default function SeatTypeList({cinemaId, seatTypes}: {cinemaId: string, seatTypes: {id: string, seat_type: string, price: number}[]}) {
    const [isOpenModal, setModal] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingSeatTypeId, setEditingSeatTypeId] = useState<string>("")

    const { mutate: insertSeatType, isError: isInsertError, error: insertError } = useInsertAdminSeatType(cinemaId)
    const { mutate: updateSeatType, isError: isUpdateError, error: updateError } = useUpdateAdminSeatType(cinemaId)
    const { mutate: deleteSeatType } = useDeleteAdminSeatType(cinemaId)

    const { register, handleSubmit, reset, formState: {errors}, control } = useForm<SeatTypeProp>({
        defaultValues: {
            seat_type: {value: "", label: ""},
            price: 0
        }
    })

    const openModal = () => setModal(true)

    const closeModal = () => {
        setModal(false)
        if (isEditing) {
            setIsEditing(false)
            setEditingSeatTypeId("")
        }
        reset()
    }

    const openEditModal = (id: string) => {
        const seatType = seatTypes.find(st => st.id === id)
        if (!seatType) return
        reset({seat_type: {value: seatType.seat_type, label: seatType.seat_type}, price: seatType.price}, {keepDefaultValues: true})
        setEditingSeatTypeId(id)
        setIsEditing(true)
        setModal(true)
    }

    const handleDelete = (id: string) => deleteSeatType(id)

    const onSubmit: SubmitHandler<SeatTypeProp> = (data) => {
        if (isEditing) {
            updateSeatType({id: editingSeatTypeId, data: {cinemaId, ...data, seat_type: data.seat_type.value}}, {
                onSuccess: () => { reset(); setIsEditing(false); setEditingSeatTypeId(""); setModal(false) }
            })
        } else {
            insertSeatType({ cinemaId, ...data, seat_type: data.seat_type.value }, {
                onSuccess: () => { reset(); setModal(false) }
            })
        }
    }

    return (
        <div>
            <div className="flex justify-end mb-3">
                <button
                    onClick={openModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                    <Plus className="h-3 w-3" />
                    Add
                </button>
            </div>

            <ModalComponent openModal={isOpenModal} closeModal={closeModal} style={modalStyle}>
                <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
                    {isEditing ? "Edit Seat Type" : "Add Seat Type"}
                </h2>

                {isInsertError && <div className="mb-4"><ErrorMessages error={insertError}/></div>}
                {isUpdateError && <div className="mb-4"><ErrorMessages error={updateError}/></div>}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Seat Type</label>
                        <Controller
                            name="seat_type"
                            control={control}
                            rules={{required: `Seat type ${emptyMsg}`}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    placeholder="Select seat type..."
                                    options={options}
                                    styles={darkSelectGenreStyle}
                                />
                            )}
                        />
                        {errors.seat_type && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.seat_type.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Price (VND)</label>
                        <input
                            type="number"
                            className={inputClass}
                            placeholder="0"
                            {...register("price", {required: `Price ${emptyMsg}`})}
                        />
                        {errors.price && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.price.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                    >
                        {isEditing ? "Update" : "Add"}
                    </button>
                </form>
            </ModalComponent>

            {seatTypes.length === 0 ? (
                <p className="text-sm text-neutral-500 text-center py-4">No seat types configured.</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {seatTypes.map(seatType => (
                        <div
                            key={seatType.id}
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-neutral-700/50 hover:bg-neutral-800/40 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${seatTypeColors[seatType.seat_type] || "bg-neutral-800 border-neutral-600 text-neutral-400"}`}>
                                    {seatType.seat_type}
                                </span>
                                <span className="text-sm text-neutral-200 font-semibold">
                                    {seatType.price.toLocaleString()} VND
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => openEditModal(seatType.id)}
                                    className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors"
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(seatType.id)}
                                    className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-red-950/50 transition-colors"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ) 
}