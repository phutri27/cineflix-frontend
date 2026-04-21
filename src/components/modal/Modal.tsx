import Modal from "react-modal"
import { X } from "lucide-react"

interface ModalNode{
    children: React.ReactNode
    openModal: boolean
    closeModal: () => void
    style?: any
}

export default function ModalComponent({children, openModal, closeModal, style}: ModalNode){
    return (
        <Modal
            isOpen={openModal}  
            onRequestClose={closeModal}  
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }, content: { 
                ...style, 
            } }}
        >
            <div className="flex justify-end mb-4">
                <button 
                    onClick={closeModal}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
            {children}
        </Modal>
    )
}