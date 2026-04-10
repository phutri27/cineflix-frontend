import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { useAdminCreateShowtime, useAdminUpdateShowtime, useGetAdminScreens } from "@/hooks";
import { type SpecificCinemaMoviesProps } from "./SpecificCinemaMovies";
import { ErrorMessages } from "@/utils/error-messages";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import type { ScreensProp } from "@/api";
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
    const queryClient = useQueryClient()
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

    const existingShowtime = screens?.flatMap((screen) => screen.showtimes)

    const onSubmit: SubmitHandler<SpecificCinemaMoviesProps> = (dt) => {
        if (!isEditing){
            const datas = dt.showtime.map((time) => ({
                screenId: dt.screenId!,
                movieId: movieId!,
                startTime: time.time
            }))
            console.log(datas)
            createShowtime(datas, {
            onSuccess: () => {
                onCloseModal()
                reset()
            }})
        } else {
            const data = existingShowtime?.map((st) => ({
                id: st.id,
                startTime: st.startTime,
                screenId: dt.screenId!,
                movieId: movieId!
            }))
            updateShowtime({data, cinemaId}, {
                onSuccess: () => {
                    onCloseModal()
                }
            })
        }
    }

    const handleDeleteTimeUpdate = (id: string) => {
        queryClient.setQueryData(["admin_screens", cinemaId], (oldData: ScreensProp[]) => {
            if (!oldData) return []
            return oldData.map((screen) => ({
                ...screen, 
                showtimes: screen.showtimes.filter((st) => st.id !== id)
            }));
        })
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
                    {isEditing ? (
                        existingShowtime?.map((st) => (
                            <div key={st.id} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                            <input
                                type="datetime-local"
                                value={format(st.startTime, "yyyy-MM-dd'T'HH:mm")}
                            />
                            <button type="button" onClick={() => handleDeleteTimeUpdate(st.id)}>
                                Delete This Time
                            </button>
                        </div>
                        ))
                    ):(fields.map((field, index) => (
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
                    )))}
                    {isEditing ? null : (<button type="button" onClick={() => append({ time: "" })}>
                        + Add Another Showtime
                    </button>)}
                </div>
                {isEditing ? <button type="submit">Update</button> : <button type="submit">Create</button>}
            </form>
        </div>
    )
}