import { useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";

interface ShowTimeProp{
    id: string
    name: string
    showtimes: {id: string, screenId: string, screenName: string, startTime: Date}[]
}
export default function SpecficTimeSeat({showTime}: {showTime: ShowTimeProp}){
    const [selectedShowTime, setSelectedShowTime] = useState<string>("")

    const navigate = useNavigate()

    const handleSelectScreen = (startTimeId: string) => {
        setSelectedShowTime(startTimeId)
    }

    if (selectedShowTime){
        navigate(`/default/cinema/${showTime.id}/booking/ticket/${selectedShowTime}`)
    }

    return (
        <div className="flex flex-col mb-6">
            <h3 className="text-lg sm:text-xl font-medium text-white mb-4">
                {showTime.name}
            </h3>
            
            <div className="flex flex-wrap gap-3">
                {showTime.showtimes.map((st) => (
                    <div 
                        key={st.id} 
                        onClick={() => handleSelectScreen(st.id)} 
                        className="cursor-pointer border border-gray-700 bg-gray-900 text-gray-300 px-5 py-2 rounded-md transition-all duration-200 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] font-medium text-sm sm:text-base"
                    >
                        <p>{format(new Date(st.startTime), "HH:mm")}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}