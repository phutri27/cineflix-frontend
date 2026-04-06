import { Link } from "react-router";
import { useBookingStore } from "@/utils/booking-store";
import { useEffect } from "react"
import { useExpireSeatPayment } from "@/hooks/user/use-seats";
import { useSearchParams } from "react-router";
import { ErrorMessages } from "@/utils/error-messages";
export default function PaymentSuccess(){    
    const clearBookingStore = useBookingStore((state) => state.clearBookingData)
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")

    const { isLoading, isError, error } = useExpireSeatPayment(sessionId!)

    useEffect(() => {
        clearBookingStore()
        useBookingStore.persist.clearStorage()
    }, [clearBookingStore])

    if (isLoading){
        return <div>Loading...</div>
    }

    return (
    <>
        {isError && <ErrorMessages error={error} />}
        <div>
            <p>Successful payment</p>
            <Link to="/"><button>Click here to return to homepage</button></Link>
        </div>
    </>
    )
}