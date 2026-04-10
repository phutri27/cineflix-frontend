import { useForm, FormProvider } from "react-hook-form";
import SeatGridForm from "./SeatGridForm";
import ModalComponent from "@/components/modal/Modal";
import { useState } from "react";
import { useGetAdminSeatTypesByCinema } from "@/hooks/admin/cinemas/use-admin-seat-type";
import { useNavigate } from "react-router";
import SeatGridLayout from "./SeatGridLayout";
import { ErrorMessages } from "@/utils/error-messages";
import { type ScreenTypeProp } from "@/api";

export interface ScreenFormData {
    rows: number,
    columns: number,
    seat_typeId: {value: string, label: string}
}

export interface SeatDetailData{
    row: string
    number: number
    seat_typeId: {value: string, label: string}
}

interface ScreenEditorProps {
    cinemaId: string
    initialName?: string
    initialSeats?: SeatDetailData[]
    onSave: (data: ScreenTypeProp, onSuccess: () => void, id?: string) => void,
    screenId?: string
    isPending: boolean
    isError: boolean
    error: Error
}
export default function ScreenEditor({ cinemaId, initialName = "", initialSeats = [], onSave, screenId, 
    isPending, isError, error }: ScreenEditorProps) {
    const [localSeats, setLocalSeats] = useState<SeatDetailData[]>(initialSeats)
    const [screenName, setScreenName] = useState<string>(initialName)
    const [isOpenModal, setModal] = useState<boolean>(false)

    const { data: seat_type, isLoading, isError: isSeatTypeError, error: seatTypeError } = useGetAdminSeatTypesByCinema(cinemaId!)
    const navigate = useNavigate()

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const handleScreenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScreenName(e.target.value)
    }

    const handleSetSeats = (newSeats: SeatDetailData[]) => {
        setLocalSeats(newSeats)
    }

    const methods = useForm({
        defaultValues: {
            screenName: initialName,
            seats: initialSeats
        }
    })
    
    const handleSave = () => {
        const formattedSeats = localSeats.map((s) => ({
            row: s.row,
            number: Number(s.number),
            seat_typeId: s.seat_typeId.value 
        }));
        const onSuccess = () => {
            navigate(-1)
        }

        if (!screenId){
            onSave({name: screenName, cinema_id: cinemaId!, seats: formattedSeats}, onSuccess)
        } else {
            const newSeats = {seats: formattedSeats, cinema_id: cinemaId!, name: screenName}
            onSave(newSeats, onSuccess, screenId)
        }
    }

    return (
        <FormProvider {...methods} >
            {isError && <ErrorMessages error={error} />}
            <div>
                <button onClick={openModal}>Create seats grid</button>
                <button onClick={handleSave} disabled={isPending}>{isPending ? "Saving" : "Save screen layout"}</button>
            </div>
            <form>
                <label htmlFor="screen_name">Screen name</label>
                <input 
                type="text" 
                name="screen_name" 
                id="screen_name" 
                value={screenName}
                onChange={handleScreenNameChange}/>
            </form>
            <SeatGridLayout 
            seats={localSeats} 
            seat_type={seat_type}
            setSeats={handleSetSeats}/>
            <ModalComponent
                openModal={isOpenModal}
                closeModal={() => setModal(false)}
            >
                <SeatGridForm 
                    seat_type={seat_type}
                    closeModal={closeModal}
                    handleSetSeats={handleSetSeats}
                />
                {isLoading && <div>Loading...</div>}
                {isSeatTypeError && <div>{seatTypeError.message}</div>}
            </ModalComponent>
        </FormProvider>
    )
}