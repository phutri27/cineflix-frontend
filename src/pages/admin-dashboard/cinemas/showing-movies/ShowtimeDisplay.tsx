import { memo } from "react";
import { format } from "date-fns";
import { useAdminShowtime } from "@/hooks";
import { Pencil, Trash2 } from "lucide-react";

interface ShowtimeDisplayProps {
    dateString: string
    showtimesForDate: { id: string, startTime: Date }[]
    handleEdit: (id: string) => void
    cinemaId: string
    movieId: string
}

export const ShowtimeDisplay = memo(function ShowtimeDisplay({
    dateString,
    showtimesForDate,
    handleEdit,
    cinemaId,
    movieId
}: ShowtimeDisplayProps) {
    const { mutate: deleteShowtime, isPending } = useAdminShowtime.useAdminDeleteShowtime(cinemaId, movieId)

    const handleDelete = (id: string) => {
        deleteShowtime(id)
    }

    return (
        <div className="mb-5 last:mb-0">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                {dateString}
            </p>
            <div className="flex flex-wrap gap-2">
                {showtimesForDate.map((st) => (
                    <div
                        key={st.id}
                        className="group relative flex items-center"
                    >
                        <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden">
                            <span className="px-3 py-2 text-sm font-semibold text-white">
                                {format(st.startTime, "HH:mm")}
                            </span>
                            <div className="flex border-l border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(st.id)}
                                    className="px-2 py-2 text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors"
                                >
                                    <Pencil className="h-3 w-3" />
                                </button>
                                <button
                                    onClick={() => handleDelete(st.id)}
                                    disabled={isPending}
                                    className="px-2 py-2 text-neutral-500 hover:text-red-500 hover:bg-red-950/50 disabled:opacity-50 transition-colors"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
})