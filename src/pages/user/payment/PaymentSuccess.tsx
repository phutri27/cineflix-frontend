import { Link } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react"; 

export default function PaymentSuccess() {    

    return (
        <div className="flex flex-col min-h-screen bg-[#141414] text-white font-sans">
            <Header />
            
            <main className="flex-1 flex items-center justify-center p-6 md:p-10 animate-fade-in">
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl flex flex-col items-center">
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
                        <CheckCircle className="w-20 h-20 text-green-500 relative z-10" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Payment Successful!
                    </h1>
                    <p className="text-neutral-400 mb-10 text-sm md:text-base leading-relaxed">
                        Your booking has been confirmed and your tickets are ready. You can view your ticket details in your booking history or check your email.
                    </p>
                    <Link to="/" className="w-full">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-3.5 px-6 rounded-lg transition-colors shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] active:scale-[0.98]">
                            Return to Homepage
                        </button>
                    </Link>
                    
                </div>
            </main>

            <Footer />
        </div>
    )
}