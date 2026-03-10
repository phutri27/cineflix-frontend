import Modal from "react-modal"

interface ModalNode{
    children: React.ReactNode
    openModal: boolean
    closeModal: () => void
}
export default function ModalComponent({children, openModal, closeModal}: ModalNode){
    return (
        <Modal
            isOpen={openModal}  
            onRequestClose={closeModal}  
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, content: { inset: '20% 30%' } }}
        >
            {children}
            <button onClick={closeModal}>X</button>
        </Modal>
    )
}
