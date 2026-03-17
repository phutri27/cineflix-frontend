import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { useAdminCreateShowtime, useAdminUpdateShowtime, useGetAdminScreens } from "@/hooks";
import { type SpecificCinemaMoviesProps } from "./SpecificCinemaMovies";
import { ErrorMessages } from "@/utils/error-messages";
interface ShowtimeFormProps {
    cinemaId: string
    movieId: string
    initialData?: {
        screenId: string
        showtimes: { time: string }[]
    }
    onCloseModal: () => void,
}

export default function ShowtimeForm({cinemaId, movieId, initialData, onCloseModal}: ShowtimeFormProps) {
    const isEditing = !!initialData;
    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            screenId: initialData?.screenId || "",
            showtime: initialData?.showtimes || [{ time: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "showtime" });

    const { data: screens } = useGetAdminScreens(cinemaId!)
    const { mutate: createShowtime, isPending: insertPending, isError: isInsertError, error: insertError } = useAdminCreateShowtime(cinemaId, movieId)
    const { mutate: updateShowtime, isPending: updatePending, isError: isUpdateError, error: updateError } = useAdminUpdateShowtime(cinemaId, movieId)
    
    const onSubmit: SubmitHandler<SpecificCinemaMoviesProps> = (data) => {
        if (!isEditing){
            const datas = data.showtime.map((time) => ({
                screenId: data.screenId!,
                movieId: movieId!,
                startTime: time.time
            }))
            createShowtime(datas, {
            onSuccess: () => {
                onCloseModal()
                reset()
            }})
        } else {
            const datas = data.showtime.map((time) => ({
                screenId: data.screenId!,
                cinemaId: cinemaId!,
                movieId: movieId!,
                startTime: time.time
            }))
            updateShowtime(datas, {
                onSuccess: () => {
                    onCloseModal()
                }
            })
        }
    }

    return (
        <div>
            <div>
                {(isInsertError || isUpdateError) && <ErrorMessages error={insertError! || updateError!}/>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="screen">Screen:</label>
                    {screens?.map((screen) => (
                        <div key={screen.id}>
                            <input
                                type="radio"
                                id={`screen-${screen.id}`}
                                value={screen.id}
                                {...register("screenId", { required: true })}
                            />
                            <label htmlFor={`screen-${screen.id}`}>{screen.name}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <label>Showtimes:</label>
                    {fields.map((field, index) => (
                        <div key={field.id} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                            
                            <input
                                type="datetime-local"
                                {...register(`showtime.${index}.time`, { required: true })}
                            />
                            {fields.length > 1 && (
                                <button type="button" onClick={() => remove(index)}>
                                    Delete This Time
                                </button>
                            )}
                        </div>
                    ))}
                    {isEditing ? null : (<button type="button" onClick={() => append({ time: "" })}>
                        + Add Another Showtime
                    </button>)}
                </div>
                {isEditing ? <button type="submit">Update</button> : <button type="submit">Create</button>}
            </form>
        </div>
    )
}