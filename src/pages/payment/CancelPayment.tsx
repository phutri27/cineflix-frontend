import { useSearchParams } from 'react-router'
import { useDeleteStripeCheckout } from '@/hooks/user/use-payment-checkout'
import { ErrorMessages } from '@/utils/error-messages'
export default function CancelPayment(){
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")

    const { isLoading, isError, error } = useDeleteStripeCheckout(sessionId || "")

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {isError && <ErrorMessages error={error} />}
            <h1>Payment Cancelled</h1>
            <p>Your payment has been cancelled. If you have any questions, please contact support.</p>
        </div>
    )       
}