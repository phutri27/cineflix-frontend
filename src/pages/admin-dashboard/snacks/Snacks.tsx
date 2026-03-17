import ModalComponent from "@/components/modal/Modal";
import { useAdminGetSnacks, useAdminDeleteSnack } from "@/hooks";
import { useState } from "react";
import { ErrorMessages } from "@/utils/error-messages";
import type { SnackResponse } from "@/api/admin/snacks/admin-snacks-api";
import SnackForm from "./SnackForm";
export default function Snacks(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState<SnackResponse | null>(null)

    const { data: snacks, isLoading, isError: isQueryError, error: queryError } = useAdminGetSnacks()
    const { mutate: deleteSnack, isPending, isError: isDeleteError, error: deleteError  } = useAdminDeleteSnack()

    const handleDelete = (id: string) => {
        deleteSnack(id)
    }

    const handleEdit = (id: string) => {
        const snack = snacks?.find(s => s.id === id)
        if(snack) {
            setEditData(snack)
            setIsModalOpen(true)
        }
    }

    const onOpenModal = () => {
        setIsModalOpen(true)
    }

    const onCloseModal = () => {
        setIsModalOpen(false)
        setEditData(null)
    }
    return (
        <div>
            <div>
                <button onClick={onOpenModal}>Add snack</button>
            </div>
            <div>
                Snacks
                {isLoading && <div>Loading...</div>}
                {isQueryError && <ErrorMessages error={queryError} />}
                {isDeleteError && <ErrorMessages error={deleteError} />}
                {snacks && snacks.map(snack => (
                    <div key={snack.id}>
                        <img src={snack.imageUrl} alt={snack.name} />
                        <h3>{snack.name}</h3>
                        <p>Price: ${snack.price}</p>
                        <button onClick={() => handleDelete(snack.id)} disabled={isPending}>{isPending ? "Deleting..." : "Delete"}</button>
                        <button onClick={() => handleEdit(snack.id)}>Edit</button>
                    </div>
                ))}
            </div>
            <ModalComponent openModal={isModalOpen} closeModal={onCloseModal}>
                <SnackForm 
                initialData={editData || undefined} 
                onClose={onCloseModal}/>
            </ModalComponent>
        </div>
    )
}