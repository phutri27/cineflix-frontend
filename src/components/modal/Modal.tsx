import Modal from "react-modal"
import { X } from "lucide-react"
interface ModalNode{
    children: React.ReactNode
    openModal: boolean
    closeModal: () => void
    style: {top: string, bottom: string, left: string, right: string}
}
export default function ModalComponent({children, openModal, closeModal, style}: ModalNode){
    return (
        <Modal
            isOpen={openModal}  
            onRequestClose={closeModal}  
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 } ,content: { 
                ...style, 
                border: 'none',
                padding: '20px',
                backgroundColor: 'rgba(16, 24, 40)'
            } }}
            >
            <X 
            onClick={closeModal}
            color="white"/>
            {children}
        </Modal>
    )
}
