import { useFormContext, type SubmitHandler, Controller } from "react-hook-form";
import type { ScreenFormData, SeatDetailData } from "./ScreenEditor";
import Select from 'react-select'
import { darkSelectGenreStyle } from "@/utils/react-select-style";
interface SeatGridFormProps {
    seat_type: {id: string, seat_type: string, cinemaId: string}[] | undefined,
    closeModal: () => void
    handleSetSeats: (newSeats: SeatDetailData[]) => void
}

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

const emptyMsg = 'field must not be empty'

export default function SeatGridForm({ seat_type, closeModal, handleSetSeats }: SeatGridFormProps) {
    const { register, reset, handleSubmit, formState: { errors }, control } = useFormContext<ScreenFormData>()

    const onSubmit: SubmitHandler<ScreenFormData> = (data) => {
        const generatedSeats: SeatDetailData[] = [];
        for (let i = 0; i < data.rows; i++) {
            const rowLetter = String.fromCharCode(65 + i);
            for (let j = 1; j <= data.columns; j++) {
                generatedSeats.push({
                    row: rowLetter,
                    number: j,
                    seat_typeId: data.seat_typeId
                });
            }
        }
        handleSetSeats(generatedSeats)
        closeModal()
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h2 className="text-lg font-bold text-white border-b border-neutral-700 pb-3">
                Generate Seat Grid
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Rows</label>
                    <input
                        id="rows"
                        type="number"
                        className={inputClass}
                        placeholder="e.g. 8"
                        {...register("rows", { required: `Rows ${emptyMsg}` })}
                    />
                    {errors.rows && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.rows.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Columns</label>
                    <input
                        id="columns"
                        type="number"
                        className={inputClass}
                        placeholder="e.g. 12"
                        {...register("columns", { required: `Columns ${emptyMsg}` })}
                    />
                    {errors.columns && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.columns.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Default Seat Type</label>
                <Controller
                    control={control}
                    name="seat_typeId"
                    rules={{ required: `Seat type ${emptyMsg}` }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            placeholder="Select seat type..."
                            options={seat_type?.map(s => ({ value: s.id, label: s.seat_type }))}
                            styles={darkSelectGenreStyle}
                        />
                    )}
                />
                {errors.seat_typeId && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.seat_typeId.message}</p>}
            </div>

            <button
                type="submit"
                className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
                Generate Grid
            </button>
        </form>
    )
}