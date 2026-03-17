import { useState } from "react";
import ModalComponent from "@/components/modal/Modal";
import LetterNode from "../LetterNode";
import { ErrorMessages } from "@/utils/error-messages";

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

    if (isError) return <div>{errorMessage}</div>;
    if (isLoading) return <div>Loading {entityName}s...</div>;

    return (
        <div>
            <div>
                <button onClick={openInsertModal}>Add {entityName}</button>
            </div>
            <ModalComponent openModal={isModalOpen} closeModal={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit}>
                    {((isInsertError || isUpdateError) && <ErrorMessages error={insertError || updateError!}/>)}
                    <input 
                        type="text" 
                        placeholder={`${entityName} name`} 
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                    {isEditing ? 
                        <button type="submit" disabled={isUpdatePending}>
                            {isUpdatePending ? "Updating..." : "Update"}
                        </button> : 
                        <button type="submit" disabled={isInsertPending}>
                            {isInsertPending ? "Saving..." : "Save"}
                        </button>
                    }
                </form>
            </ModalComponent>
            
            <LetterNode 
                movieOptionsData={data!} 
                handleDelete={onDelete}
                openEditModal={openEditModal}
            />
            {data?.length === 0 && <p>No {entityName.toLowerCase()}s found</p>}
        </div>
    );
}