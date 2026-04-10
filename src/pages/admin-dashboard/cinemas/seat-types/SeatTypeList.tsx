import { useInsertAdminSeatType, useUpdateAdminSeatType, useDeleteAdminSeatType } from "@/hooks/admin/cinemas/use-admin-seat-type"
import ModalComponent from "@/components/modal/Modal"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { useState } from "react"
import Select from 'react-select'
import { ErrorMessages } from "@/utils/error-messages"

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
export default function SeatTypeList({cinemaId, seatTypes}: {cinemaId: string, seatTypes: {id: string, seat_type: string, price: number}[]}) {
    const [isOpenModal, setModal] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingSeatTypeId, setEditingSeatTypeId] = useState<string>("")

    const { mutate: insertSeatType, isError: isInsertError, error: insertError } = useInsertAdminSeatType(cinemaId)
    const { mutate: updateSeatType, isError: isUpdateError, error: updateError } = useUpdateAdminSeatType(cinemaId)
    const { mutate: deleteSeatType } = useDeleteAdminSeatType(cinemaId)

    const { register, handleSubmit, reset, formState: {errors},control } = useForm<SeatTypeProp>({
        defaultValues: {
            seat_type: {value: "", label: ""},
            price: 0
        }
    })

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
        if (isEditing){
            setIsEditing(false)
            setEditingSeatTypeId("")
        }
        reset()
    }

    const openEditModal = (id: string) => {
        const seatType = seatTypes.find(seatType => seatType.id === id)
        if (!seatType) return
        reset({seat_type: {value: seatType.seat_type, label: seatType.seat_type}, price: seatType.price}, {keepDefaultValues: true})
        setEditingSeatTypeId(id)
        setIsEditing(true)
        setModal(true)
    }

    const handleDelete = (id: string) => {
        deleteSeatType(id)
    }

    const onSubmit: SubmitHandler<SeatTypeProp> = (data) => {
        if (isEditing) {
            updateSeatType({id: editingSeatTypeId, data: {cinemaId, ...data, seat_type: data.seat_type.value}}, {
                onSuccess: () => {
                    reset()
                    setIsEditing(false)
                    setEditingSeatTypeId("")
                    setModal(false)
                }
            })
        } else {
            insertSeatType({ cinemaId, ...data, seat_type: data.seat_type.value }, {
                onSuccess: () => {
                    reset()
                    setModal(false)
                }
            })
        }
    }

    return (
        <div>
            <button onClick={openModal}>Add seat type</button>
            <ModalComponent openModal={isOpenModal} closeModal={closeModal}>
                {isInsertError && <ErrorMessages error={insertError}/>}
                {isUpdateError && <ErrorMessages error={updateError} />}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price"{...register("price", {required: `Price ${emptyMsg}`})}/>
                        {errors.price && <p>{errors.price.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="seat_type">Seat Type</label>
                        <Controller
                            name="seat_type"
                            control={control}
                            rules={{required: `Seat type ${emptyMsg}`}}
                            render={({field}) => (
                                <Select 
                                    {...field}
                                    placeholder="Select seat type..."
                                    options={options}
                                />
                            )}
                        />
                        {errors.seat_type && <p>{errors.seat_type.message}</p>}
                    </div>
                    <button type="submit">Add</button>
                </form>
            </ModalComponent>
            <div>
                {seatTypes.map(seatType => (
                    <div key={seatType.id}>
                        <p>{seatType.seat_type}:{seatType.price} VND</p>
                        <button onClick={() => openEditModal(seatType.id)}>Edit</button>
                        <button onClick={() => handleDelete(seatType.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    ) 
}