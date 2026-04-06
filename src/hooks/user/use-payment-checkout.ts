import { createCheckoutSession, createVnpayCheckoutSession, cancelStripeCheckoutSesison } from "@/api/user/payment-checkout-api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useStripeCheckout = () => {
    return useMutation({
        mutationFn: createCheckoutSession
    })
}

export const useVnpayCheckout = () => {
    return useMutation({
        mutationFn: createVnpayCheckoutSession
    })
}

export const useDeleteStripeCheckout = (sessionId: string) => {
    return useQuery({
        queryKey: ["stripe_cancel", sessionId],
        queryFn: () => cancelStripeCheckoutSesison(sessionId)
    })
}