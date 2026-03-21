import { memo } from "react";

interface ShowtimeDisplayProps{
    dateString: string
    showtimesForDate: {id: string, startTime: Date}[]
}

export const ShowtimeDisplay = memo(function ShowtimeDisplay({dateString, showtimesForDate}: ShowtimeDisplayProps){
    return (
            <div key={dateString} className="mt-4">
                <p className="font-bold text-lg mb-2">{dateString}</p> 
                <div className="flex flex-wrap gap-2">
                    {showtimesForDate.map((st) => (
                        <button key={st.id} className="p-2 bg-blue-500 text-white rounded">
                            {st.startTime.toString().substring(11, 16)}
                        </button>
                    ))}
                </div>
            </div>
        );
})