import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { useAdminShowtime, useAdminScreen } from "@/hooks";
import { type SpecificCinemaMoviesProps } from "./SpecificCinemaMovies";
import { ErrorMessages } from "@/utils/error-messages";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import type { ScreensProp } from "@/types/admin/cinema/screen-type";
import type React from "react";
import { Plus, Trash2 } from "lucide-react";

interface ShowtimeFormProps {
    cinemaId: string
    movieId: string
    showTimeEditId: string
    onCloseModal: () => void,
}

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors [color-scheme:dark]"

export default function ShowtimeForm({ cinemaId, movieId, showTimeEditId, onCloseModal }: ShowtimeFormProps) {
    const isEditing = !!showTimeEditId
    const queryClient = useQueryClient()

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            screenId: "",
            showtime: [{ time: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "showtime" });

    const { data: screens } = useAdminScreen.useGetAdminScreens(cinemaId!)
    const { mutate: createShowtime, isPending: insertPending, isError: isInsertError, error: insertError } = useAdminShowtime.useAdminCreateShowtime(cinemaId, movieId)
    const { mutate: updateShowtime, isPending: updatePending, isError: isUpdateError, error: updateError } = useAdminShowtime.useAdminUpdateShowtime(cinemaId, movieId)

    const pickedScreen = screens?.find((screen) =>
        screen.showtimes.some((st) => st.id === showTimeEditId)
    );
    const specificScreenId = pickedScreen?.id;
    const specificShowtime = pickedScreen?.showtimes.find((st) => st.id === showTimeEditId);
    const formatedShowtime = specificShowtime?.startTime ? format(specificShowtime?.startTime, "yyyy-MM-dd'T'HH:mm") : ""

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
            }
        })
    }

    const onUpdate = (e: React.SubmitEvent) => {
        e.preventDefault()
        const data = {
            screenId: specificScreenId as string,
            movieId: movieId!,
            startTime: specificShowtime?.startTime.toString() as string
        }
        updateShowtime({ id: showTimeEditId, data }, {
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
            {(isInsertError || isUpdateError) && (
                <div className="mb-4">
                    <ErrorMessages error={insertError! || updateError!} />
                </div>
            )}
            {isEditing ? (
                <form onSubmit={onUpdate} className="flex flex-col gap-5">
                    <h2 className="text-lg font-bold text-white border-b border-neutral-700 pb-3">
                        Edit Showtime
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Showtime</label>
                        <input
                            type="datetime-local"
                            id="start-time"
                            name="start-time"
                            value={formatedShowtime}
                            onChange={(e) => handleTimeUpdate(String(specificShowtime?.id), e)}
                            className={inputClass}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={updatePending}
                        className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                    >
                        {updatePending ? "Updating..." : "Update"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <h2 className="text-lg font-bold text-white border-b border-neutral-700 pb-3">
                        Create Showtime
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-3">Screen</label>
                        <div className="flex flex-wrap gap-2">
                            {screens?.map((screen) => (
                                <label
                                    key={screen.id}
                                    className="relative cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        id={`screen-${screen.id}`}
                                        value={screen.id}
                                        {...register("screenId", { required: true })}
                                        className="peer hidden"
                                    />
                                    <div className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-700 bg-neutral-800/50 text-neutral-400 peer-checked:border-red-600 peer-checked:bg-red-600/10 peer-checked:text-white hover:border-neutral-500 transition-colors">
                                        {screen.name}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-3">Showtimes</label>
                        <div className="flex flex-col gap-2">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <input
                                        type="datetime-local"
                                        {...register(`showtime.${index}.time`, { required: true })}
                                        className={`${inputClass} flex-1`}
                                    />
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-red-950/50 border border-neutral-700 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => append({ time: "" })}
                            className="flex items-center gap-2 mt-3 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                        >
                            <Plus className="h-3.5 w-3.5" />
                            Add Another Showtime
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={insertPending}
                        className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                    >
                        {insertPending ? "Creating..." : "Create"}
                    </button>
                </form>
            )}
        </div>
    )
}