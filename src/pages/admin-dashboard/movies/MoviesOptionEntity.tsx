import { useState } from "react";
import ModalComponent from "@/components/modal/Modal";
import LetterNode from "../LetterNode";
import { ErrorMessages } from "@/utils/error-messages";
import { Plus } from "lucide-react";

interface Entity {
    id: string;
    name: string;
}

interface EntityProps {
    entityName: string; 
    data: Entity[] | undefined;
    isLoading: boolean;
    isError: boolean;
    errorMessage?: string;
    onInsert: (name: string, onSuccess: () => void) => void;
    onUpdate: (id: string, name: string, onSuccess: () => void) => void;
    onDelete: (id: string) => void;
    isInsertPending: boolean;
    isUpdatePending: boolean;
    isInsertError: boolean
    insertError: Error
    isUpdateError: boolean
    updateError: Error
}

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

export default function MoviesOptionEntity({
    entityName,
    data,
    isLoading,
    isError,
    errorMessage,
    onInsert,
    onUpdate,
    onDelete,
    isInsertPending,
    isUpdatePending,
    isInsertError,
    insertError,
    isUpdateError,
    updateError
}: EntityProps) {
    const [nameInput, setNameInput] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string>("");
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openInsertModal = () => {
        setIsModalOpen(true);
        setIsEditing(false);
        setNameInput("");
    };

    const openEditModal = (id: string) => {
        setIsModalOpen(true);
        setIsEditing(true);
        const entityToEdit = data?.find((e) => e.id === id);
        if (entityToEdit) {
            setNameInput(entityToEdit.name);
            setEditingId(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const onSuccess = () => {
            setIsModalOpen(false);
            setEditingId("");
        };

        if (isEditing) {
            onUpdate(editingId, nameInput, onSuccess);
        } else {
            onInsert(nameInput, onSuccess);
        }
    };

    if (isError) return <div className="p-6 text-red-500">{errorMessage}</div>;
    if (isLoading) return <div className="p-6 text-neutral-400">Loading {entityName}s...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-neutral-400">
                    {data?.length || 0} {entityName.toLowerCase()}{(data?.length || 0) !== 1 && "s"}
                </p>
                <button 
                    onClick={openInsertModal}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add {entityName}
                </button>
            </div>

            <ModalComponent 
                openModal={isModalOpen} 
                closeModal={() => setIsModalOpen(false)}
                style={modalStyle}
            >
                <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
                    {isEditing ? `Edit ${entityName}` : `Add ${entityName}`}
                </h2>

                {((isInsertError || isUpdateError) && (
                    <div className="mb-4">
                        <ErrorMessages error={insertError || updateError!}/>
                    </div>
                ))}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Name
                        </label>
                        <input 
                            type="text" 
                            placeholder={`${entityName} name`} 
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isEditing ? isUpdatePending : isInsertPending}
                        className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                    >
                        {isEditing 
                            ? (isUpdatePending ? "Updating..." : "Update") 
                            : (isInsertPending ? "Saving..." : "Save")
                        }
                    </button>
                </form>
            </ModalComponent>
            
            <LetterNode 
                movieOptionsData={data!} 
                handleDelete={onDelete}
                openEditModal={openEditModal}
            />

            {data?.length === 0 && (
                <p className="text-neutral-500 text-sm text-center py-8">
                    No {entityName.toLowerCase()}s found.
                </p>
            )}
        </div>
    );
}