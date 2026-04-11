import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { useAdminCreateShowtime, useAdminUpdateShowtime, useGetAdminScreens } from "@/hooks";
import { type SpecificCinemaMoviesProps } from "./SpecificCinemaMovies";
import { ErrorMessages } from "@/utils/error-messages";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import type { ScreensProp } from "@/api";
import type React from "react";

interface ShowtimeFormProps {
    cinemaId: string
    movieId: string
    showTimeEditId: string
    onCloseModal: () => void,
}

export default function ShowtimeForm({cinemaId, movieId, showTimeEditId, onCloseModal}: ShowtimeFormProps) {
    const isEditing = !!showTimeEditId
    const queryClient = useQueryClient()

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            screenId: "",
            showtime: [{ time: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "showtime" });

    const { data: screens } = useGetAdminScreens(cinemaId!)
    const { mutate: createShowtime, isPending: insertPending, isError: isInsertError, error: insertError } = useAdminCreateShowtime(cinemaId, movieId)
    const { mutate: updateShowtime, isPending: updatePending, isError: isUpdateError, error: updateError } = useAdminUpdateShowtime(cinemaId, movieId)

    const pickedScreen = screens?.find((screen) => 
        screen.showtimes.some((st) => st.id === showTimeEditId)
    );
    const specificScreenId = pickedScreen?.id;
    const specificShowtime = pickedScreen?.showtimes.find((st) => st.id === showTimeEditId);
    const formatedShowtime = specificShowtime?.startTime ? format(specificShowtime?.startTime, "yyyy-MM-dd'T'HH:mm") : "    "

    const onSubmit: SubmitHandler<SpecificCinemaMoviesProps> = (dt) => {
        const datas = dt.showtime.map((time) => ({
            screenId: dt.screenId!,
            movieId: movieId!,
            startTime: time.time
        }))
        createShowtime(datas, {
        onSuccess: () => {
            onCloseModal()
            reset()
        }})
    }

    const onUpdate = (e: React.SubmitEvent) => {
        e.preventDefault()
        const data = {
            screenId: specificScreenId as string,
            movieId: movieId!,
            startTime: specificShowtime?.startTime.toString() as string
        }
        updateShowtime({id: showTimeEditId, data}, {
            onSuccess: () => {
                onCloseModal()
            }
        })

    }

    const handleTimeUpdate = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        queryClient.setQueryData(["admin_screens", cinemaId], (oldData: ScreensProp[]) => {
            if (!oldData) return []
            return oldData.map((screen) => ({
                ...screen, 
                showtimes: screen.showtimes.map((st) => (
                    st.id === id ? { ...st, startTime: e.target.value } : st
                ))
            }));
        })
    }

    return (
        <div>
            <div>
                {(isInsertError || isUpdateError) && <ErrorMessages error={insertError! || updateError!}/>}
            </div>
            {isEditing ? (<form onSubmit={onUpdate}>
                <label htmlFor="start-time">Showtime</label>
                <input 
                    type="datetime-local" 
                    id="start-time"
                    name="start-time"
                    value={formatedShowtime}
                    onChange={(e) => handleTimeUpdate(String(specificShowtime?.id), e)}
                />
                <button type="submit">Update</button>
            </form>) : (<form onSubmit={handleSubmit(onSubmit)}>
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
                    {(fields.map((field, index) => (
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
                <button type="submit">Create</button>
            </form>)}
        </div>
    )
}