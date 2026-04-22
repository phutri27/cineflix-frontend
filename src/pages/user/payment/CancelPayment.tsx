import { useSearchParams, Link } from 'react-router'
import { usePaymentCheckout } from '@/hooks';
import { ErrorMessages } from '@/utils/error-messages'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { XCircle } from "lucide-react";

export default function CancelPayment() {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")

    const { isLoading, isError, error } = usePaymentCheckout.useDeleteStripeCheckout(sessionId || "")

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-[#141414] text-white font-sans">
                <Header />
                <main className="flex-1 flex items-center justify-center p-6 md:p-10">
                    <div className="flex flex-col items-center animate-pulse">
                        <div className="h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-neutral-400 font-medium">Cancelling payment session...</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#141414] text-white font-sans">
            <Header />
            <main className="flex-1 flex items-center justify-center p-6 md:p-10 animate-fade-in">
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl flex flex-col items-center">
                    {isError && (
                        <div className="w-full mb-6">
                            <ErrorMessages error={error} />
                        </div>
                    )}
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full"></div>
                        <XCircle className="w-20 h-20 text-red-500 relative z-10" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Payment Cancelled
                    </h1>
                    <p className="text-neutral-400 mb-10 text-sm md:text-base leading-relaxed">
                        Your payment has been cancelled and no charges were made. If you experienced an issue or have any questions, please contact our support team.
                    </p>
                    <Link to="/" className="w-full">
                        <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-lg py-3.5 px-6 rounded-lg border border-neutral-700 transition-colors active:scale-[0.98]">
                            Return to Homepage
                        </button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    )       
}