import { useMutation, useQuery } from "@tanstack/react-query";
import { paymentCheckoutApi } from "@/api";
export const useGetVnpayUrl = (urlHash: string, searchUrl: string) => {
    return useQuery({
        queryKey: ["vnpayUrl", urlHash],
        queryFn: () => paymentCheckoutApi.getVnpayUrl(searchUrl),
        refetchOnWindowFocus: false
    })
}

export const useStripeCheckout = () => {
    return useMutation({
        mutationFn: paymentCheckoutApi.createCheckoutSession,

    })
}

export const useVnpayCheckout = () => {
    return useMutation({
        mutationFn: paymentCheckoutApi.createVnpayCheckoutSession
    })
}

export const useDeleteStripeCheckout = (sessionId: string) => {
    return useQuery({
        queryKey: ["stripe_cancel", sessionId],
        queryFn: () => paymentCheckoutApi.cancelStripeCheckoutSesison(sessionId),
        refetchOnWindowFocus: false
    })
}