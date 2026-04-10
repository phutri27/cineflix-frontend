import { createCheckoutSession, createVnpayCheckoutSession, cancelStripeCheckoutSesison, getVnpayUrl } from "@/api/user/payment-checkout-api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetVnpayUrl = (urlHash: string) => {
    return useQuery({
        queryKey: ["vnpayUrl", urlHash],
        queryFn: getVnpayUrl,
        refetchOnWindowFocus: false
    })
}

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
        queryFn: () => cancelStripeCheckoutSesison(sessionId),
        refetchOnWindowFocus: false
    })
}