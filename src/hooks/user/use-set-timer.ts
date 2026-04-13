import { useEffect, useState } from "react";
export function useSetTimer(time: number, running: boolean){
    const [remainingTimes, setRemainingTimes] = useState<number>(time)

    useEffect(() => {
        const deadline = (Date.now() + time * 1000)

        let timer: ReturnType<typeof setInterval>
        if (running){
            timer = setInterval(() => {
                const remains = deadline - Date.now()
                if (remains <= 0){
                    clearInterval(timer)
                    setRemainingTimes(0)
                } else{
                    setRemainingTimes(Math.floor(remains / 1000))
                }
            }, 1000)
        } 

        return () => clearInterval(timer)
    }, [time, running])

    return remainingTimes
}   