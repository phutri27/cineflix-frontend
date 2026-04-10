import { useGetVnpayUrl } from "@/hooks/user/use-payment-checkout";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { useBookingStore } from "@/utils/booking-store";
import { useEffect } from "react";

export default function VnpayPayment(){
    const [searchParams] = useSearchParams()
    const hashCode = searchParams.get("vnp_SecureHash")
    const clearBookingStore = useBookingStore((state) => state.clearBookingData)
    const { isLoading, isError, error } = useGetVnpayUrl(hashCode!)

    useEffect(() => {
        clearBookingStore()
        useBookingStore.persist.clearStorage()
    }, [clearBookingStore])

    if (isLoading){
        return <div>Loading...</div>
    }

    if (isError){
        if (!error.response.data.success){
            return (
                <>
                    <p>Payment cancelled</p>
                    <Link to="/">Click here to return to home page</Link>
                </>
            )
        } 
        if (!error.response.data.verified){
            return (
                <>
                    <p>Error!! Payment not verified</p>
                    <Link to="/">Click here to return to home page</Link>
                </>
            )
        }
    }
    return (
        <>
            <p>Payment success</p>
            <Link to="/">Click here to return to home page</Link>
        </>
    )
}