import ModalComponent from "@/components/modal/Modal";
import { useAdminSnack } from "@/hooks";
import { useState } from "react";
import { ErrorMessages } from "@/utils/error-messages";
import type { SnackResponse } from "@/types/admin/snacks/snacks-type";
import SnackForm from "./SnackForm";
import { Plus, Pencil, Trash2 } from "lucide-react";

const modalStyle = {
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '480px',
    width: '90%',
    maxHeight: '85vh',
    overflow: 'auto',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
}

export default function Snacks(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState<SnackResponse | null>(null)

    const { data: snacks, isLoading, isError: isQueryError, error: queryError } = useAdminSnack.useAdminGetSnacks()
    const { mutate: deleteSnack, isPending, isError: isDeleteError, error: deleteError } = useAdminSnack.useAdminDeleteSnack()

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
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-neutral-400">
                    {snacks?.length || 0} snack{(snacks?.length || 0) !== 1 && "s"}
                </p>
                <button
                    onClick={onOpenModal}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add Snack
                </button>
            </div>

            {isLoading && <p className="text-neutral-400 text-sm">Loading...</p>}
            {isQueryError && <div className="mb-4"><ErrorMessages error={queryError} /></div>}
            {isDeleteError && <div className="mb-4"><ErrorMessages error={deleteError} /></div>}

            {snacks && snacks.length === 0 && (
                <p className="text-neutral-500 text-sm text-center py-8">No snacks added yet.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {snacks?.map(snack => (
                    <div
                        key={snack.id}
                        className="bg-neutral-800/40 border border-neutral-700 rounded-lg overflow-hidden group"
                    >
                        <div className="relative">
                            <img
                                src={snack.imageUrl}
                                alt={snack.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => handleEdit(snack.id)}
                                    className="h-10 w-10 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-400 transition-colors"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(snack.id)}
                                    disabled={isPending}
                                    className="h-10 w-10 rounded-full bg-neutral-800 border border-red-800 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-50 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-sm font-bold text-white truncate">{snack.name}</h3>
                            <p className="text-sm text-neutral-400 mt-1">
                                {snack.price.toLocaleString()} VND
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <ModalComponent openModal={isModalOpen} closeModal={onCloseModal} style={modalStyle}>
                <SnackForm
                    initialData={editData || undefined}
                    onClose={onCloseModal}
                />
            </ModalComponent>
        </div>
    )
}