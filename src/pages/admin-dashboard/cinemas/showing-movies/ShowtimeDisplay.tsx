import { memo } from "react";
import { format } from "date-fns";
import { useAdminDeleteShowtime } from "@/hooks";
interface ShowtimeDisplayProps{
    dateString: string
    showtimesForDate: {id: string, startTime: Date}[]
    handleEdit: (id: string) => void
    cinemaId: string
    movieId: string
}

export const ShowtimeDisplay = memo(function ShowtimeDisplay({dateString, 
    showtimesForDate, 
    handleEdit,
    cinemaId,
    movieId
}: ShowtimeDisplayProps){
    const { mutate: deleteShowtime } = useAdminDeleteShowtime(cinemaId, movieId)

    const handleDelete = (id: string) => {
        deleteShowtime(id)
    }
    return (
            <div key={dateString} className="mt-4">
                <p className="font-bold text-lg mb-2">{dateString}</p> 
                <div className="flex flex-wrap gap-2">
                    {showtimesForDate.map((st) => (
                        <>
                            <button key={st.id} className="p-2 bg-blue-500 text-white rounded">
                                {format(st.startTime, "HH:mm")}
                            </button>
                            <button onClick={() => handleEdit(st.id)}>Edit</button>
                            <button onClick={() => handleDelete(st.id)}>Delete</button>
                        </>
                    ))}
                </div>
            </div>
        );
})