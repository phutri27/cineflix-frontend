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

    if (selectedShowTime) {
        navigate(`/default/cinema/${showTime.id}/booking/ticket/${selectedShowTime}`)
    }

    const allShowTimes = showTime.showtimes.map(s => s)

    return (
        <div key={showTime.id}>
            <p>{showTime.name}</p>
            {allShowTimes.map((st, index) => (
                <div onClick={() => handleSelectScreen(st.id)} key={index}>
                    <p>{format(st.startTime, "HH:mm")}</p>
                </div>
            ))}
        </div>
)
}