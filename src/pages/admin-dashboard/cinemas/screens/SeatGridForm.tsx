import { useFormContext, type SubmitHandler, Controller } from "react-hook-form";
import { type ScreenFormData, type SeatDetailData } from "./ScreenEditor";
import Select from 'react-select'

interface SeatGridFormProps {
    seat_type: {id: string, seat_type: string, cinemaId: string}[] | undefined,
    closeModal: () => void
    handleSetSeats: (newSeats: SeatDetailData[]) => void
}

const emptyMsg = 'field must not be empty'
export default function SeatGridForm({seat_type, closeModal, handleSetSeats}: SeatGridFormProps) {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="rows">Rows</label>
                <input id="rows" {...register("rows", { required: `Rows ${emptyMsg}`})} />
                {errors.rows && <span>{errors.rows.message}</span>}
            </div>
            <div>
                <label htmlFor="columns">Columns</label>
                <input id="columns" {...register("columns", { required: `Columns ${emptyMsg}`})} />
                {errors.columns && <span>{errors.columns.message}</span>}
            </div>
            <div>
                <label htmlFor="seat_typeId">Seat type</label>
                <Controller
                    control={control}
                    name="seat_typeId"
                    rules={{required: `Seat type ${emptyMsg}`}}
                    render={({ field }) => (
                        <Select
                            {...field} 
                            placeholder="Select seat type"
                            options={seat_type?.map(s => ({value: s.id, label: s.seat_type}))}
                        />
                    )} 
                />
                {errors.seat_typeId && <span>{errors.seat_typeId.message}</span>}
            </div>
            <button type="submit">Create seat grid</button>
        </form>
    )
}