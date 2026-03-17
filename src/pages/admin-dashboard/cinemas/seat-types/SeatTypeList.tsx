import { useInsertAdminSeatType, useUpdateAdminSeatType, useDeleteAdminSeatType } from "@/hooks/admin/cinemas/use-admin-seat-type"
import ModalComponent from "@/components/modal/Modal"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useState } from "react"

const emptyMsg = 'field cannot be empty'
export default function SeatTypeList({cinemaId, seatTypes}: {cinemaId: string, seatTypes: {id: string, seat_type: string, price: number}[]}) {
    const [isOpenModal, setModal] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingSeatTypeId, setEditingSeatTypeId] = useState<string>("")

    const { mutate: insertSeatType } = useInsertAdminSeatType(cinemaId)
    const { mutate: updateSeatType } = useUpdateAdminSeatType(cinemaId)
    const { mutate: deleteSeatType } = useDeleteAdminSeatType(cinemaId)

    const { register, handleSubmit, reset, formState: {errors} } = useForm<{seat_type: string, price: number}>({
        defaultValues: {
            seat_type: "",
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
        reset({seat_type: seatType.seat_type, price: seatType.price}, {keepDefaultValues: true})
        setEditingSeatTypeId(id)
        setIsEditing(true)
        setModal(true)
    }

    const handleDelete = (id: string) => {
        deleteSeatType(id)
    }

    const onSubmit: SubmitHandler<{seat_type: string, price: number}> = (data) => {
        if (isEditing) {
            updateSeatType({id: editingSeatTypeId, data: {cinemaId, ...data}}, {
                onSuccess: () => {
                    reset()
                    setIsEditing(false)
                    setEditingSeatTypeId("")
                    setModal(false)
                }
            })
        } else {
            insertSeatType({ cinemaId, ...data }, {
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price"{...register("price", {required: `Price ${emptyMsg}`})}/>
                        {errors.price && <p>{errors.price.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="seat_type">Seat Type</label>
                        <input id="seat_type" {...register("seat_type", {required: `Seat type ${emptyMsg}`})}/>
                        {errors.seat_type && <p>{errors.seat_type.message}</p>}
                    </div>
                    <button type="submit">Add</button>
                </form>
            </ModalComponent>
            <div>
                {seatTypes.map(seatType => (
                    <div key={seatType.id}>
                        <p>{seatType.seat_type}: ${seatType.price}</p>
                        <button onClick={() => openEditModal(seatType.id)}>Edit</button>
                        <button onClick={() => handleDelete(seatType.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    ) 
}