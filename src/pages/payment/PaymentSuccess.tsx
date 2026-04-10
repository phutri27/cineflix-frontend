import { Link } from "react-router";
import { useBookingStore } from "@/utils/booking-store";
import { useEffect } from "react"

export default function PaymentSuccess(){    
    const clearBookingStore = useBookingStore((state) => state.clearBookingData)

    useEffect(() => {
        clearBookingStore()
        useBookingStore.persist.clearStorage()
    }, [clearBookingStore])

    return (
    <>
        <div>
            <p>Successful payment</p>
            <Link to="/"><button>Click here to return to homepage</button></Link>
        </div>
    </>
    )
}