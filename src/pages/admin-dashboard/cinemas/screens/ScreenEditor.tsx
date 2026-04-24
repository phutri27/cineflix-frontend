import { useForm, FormProvider } from "react-hook-form";
import SeatGridForm from "./SeatGridForm";
import ModalComponent from "@/components/modal/Modal";
import { useState } from "react";
import { useAdminSeatType } from "@/hooks";
import { useNavigate } from "react-router";
import SeatGridLayout from "./SeatGridLayout";
import { ErrorMessages } from "@/utils/error-messages";
import type { ScreenTypeProp } from "@/types/admin/cinema/screen-type";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, LayoutGrid, Save } from "lucide-react";

export interface ScreenFormData {
    rows: number,
    columns: number,
    seat_typeId: {value: string, label: string}
}

export interface SeatDetailData {
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

const modalStyle = {
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '480px',
    width: '90%',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
}

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

export default function ScreenEditor({ cinemaId, initialName = "", initialSeats = [], onSave, screenId,
    isPending, isError, error }: ScreenEditorProps) {
    const [localSeats, setLocalSeats] = useState<SeatDetailData[]>(initialSeats)
    const [screenName, setScreenName] = useState<string>(initialName)
    const [isOpenModal, setModal] = useState<boolean>(false)

    const { data: seat_type, isLoading, isError: isSeatTypeError, error: seatTypeError } = useAdminSeatType.useGetAdminSeatTypesByCinema(cinemaId!)
    const navigate = useNavigate()

    const handleScreenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScreenName(e.target.value)
    }

    const handleSetSeats = (newSeats: SeatDetailData[]) => {
        setLocalSeats(newSeats)
    }

    const methods = useForm({
        values: {
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
        const onSuccess = () => navigate(-1)

        if (!screenId) {
            onSave({ name: screenName, cinema_id: cinemaId!, seats: formattedSeats }, onSuccess)
        } else {
            const newSeats = { seats: formattedSeats, cinema_id: cinemaId!, name: screenName }
            onSave(newSeats, onSuccess, screenId)
        }
    }

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                
                <div className="flex items-center justify-between mb-8 border-b border-neutral-700 pb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="h-9 w-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            {screenId ? "Edit Screen" : "Add Screen"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg border border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                        >
                            <LayoutGrid className="h-4 w-4" />
                            Generate Grid
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                        >
                            <Save className="h-4 w-4" />
                            {isPending ? "Saving..." : "Save Layout"}
                        </button>
                    </div>
                </div>

                {isError && (
                    <div className="mb-6 text-red-500">
                        <ErrorMessages error={error} />
                    </div>
                )}
                <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 mb-8 max-w-md">
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Screen Name</label>
                    <input
                        type="text"
                        name="screen_name"
                        id="screen_name"
                        value={screenName}
                        onChange={handleScreenNameChange}
                        className={inputClass}
                        placeholder="e.g. Screen 1"
                    />
                </div>
                <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
                        Seat Layout
                    </h2>
                    {localSeats.length === 0 ? (
                        <div className="text-center py-12">
                            <LayoutGrid className="h-10 w-10 text-neutral-600 mx-auto mb-3" />
                            <p className="text-sm text-neutral-500 mb-1">No seats configured yet.</p>
                            <p className="text-xs text-neutral-600">Click "Generate Grid" to create a seat layout.</p>
                        </div>
                    ) : (
                        <FormProvider {...methods}>
                            <SeatGridLayout
                                seats={localSeats}
                                seat_type={seat_type}
                                setSeats={handleSetSeats}
                            />
                        </FormProvider>
                    )}
                </div>
                <FormProvider {...methods}>
                    <ModalComponent
                        openModal={isOpenModal}
                        closeModal={() => setModal(false)}
                        style={modalStyle}
                    >
                        <SeatGridForm
                            seat_type={seat_type}
                            closeModal={() => setModal(false)}
                            handleSetSeats={handleSetSeats}
                        />
                        {isLoading && <p className="text-neutral-400 text-sm mt-3">Loading seat types...</p>}
                        {isSeatTypeError && <div className="mt-3 text-red-500"><ErrorMessages error={seatTypeError} /></div>}
                    </ModalComponent>
                </FormProvider>
            </main>
            <Footer />
        </div>
    )
}