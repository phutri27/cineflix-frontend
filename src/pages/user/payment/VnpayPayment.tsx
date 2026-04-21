import { useGetVnpayUrl } from "@/hooks/user/use-payment-checkout";
import { useSearchParams, Link } from "react-router";
import { useBookingStore } from "@/utils/booking-store";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useUserRoleStore } from "@/utils/user-role-store";

const StatusCard = ({ Icon, glow, color, title, desc, btnClass }: any) => (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl flex flex-col items-center">
        <div className="mb-6 relative">
            <div className={`absolute inset-0 ${glow} blur-xl rounded-full`}></div>
            <Icon className={`w-20 h-20 ${color} relative z-10`} />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">{title}</h1>
        <p className="text-neutral-400 mb-10 leading-relaxed">{desc}</p>
        <Link to="/" className="w-full">
            <button className={`w-full text-white font-bold text-lg py-3.5 px-6 rounded-lg transition-colors active:scale-[0.98] ${btnClass}`}>
                Return to Homepage
            </button>
        </Link>
    </div>
);

export default function VnpayPayment() {
    const [searchParams] = useSearchParams();
    const hashCode = searchParams.get("vnp_SecureHash");
    const clearBookingStore = useBookingStore((state) => state.clearBookingData);
    
    const queryClient = useQueryClient()
    const userId = useUserRoleStore((state) => state.id)
    const { isLoading, isError, error, isSuccess } = useGetVnpayUrl(hashCode!);

    useEffect(() => {
        if (isSuccess){
            clearBookingStore();
            useBookingStore.persist.clearStorage();
            queryClient.invalidateQueries({queryKey: ["booking_history", userId]})
            queryClient.invalidateQueries({queryKey: ["notifications", userId]})
            queryClient.invalidateQueries({queryKey: ["profile", userId]})
            queryClient.invalidateQueries({queryKey: ["profile_voucher", userId]})
        }
    }, [clearBookingStore, userId]);

    let content;

    if (isLoading) {
        content = (
            <div className="flex flex-col items-center animate-pulse">
                <div className="h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-neutral-400 font-medium">Verifying VNPay transaction...</p>
            </div>
        );
    } else if (isError && !error?.response?.data?.success) {
        content = <StatusCard 
            Icon={XCircle} glow="bg-red-500/10" color="text-red-500" 
            title="Payment Cancelled" 
            desc="You have cancelled the VNPay transaction. No charges were made to your account." 
            btnClass="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700" 
        />;
    } else if (isError && !error?.response?.data?.verified) {
        content = <StatusCard 
            Icon={AlertTriangle} glow="bg-amber-500/10" color="text-amber-500" 
            title="Verification Failed" 
            desc="We could not verify the authenticity of this transaction. Please contact support." 
            btnClass="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700" 
        />;
    } else {
        content = <StatusCard 
            Icon={CheckCircle} glow="bg-green-500/20" color="text-green-500" 
            title="Payment Successful!" 
            desc="Your VNPay transaction was completed successfully. Your tickets are secured and ready!" 
            btnClass="bg-red-600 hover:bg-red-700 shadow-lg" 
        />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#141414] text-white font-sans">
            <Header />
            <main className="flex-1 flex items-center justify-center p-6 md:p-10 animate-fade-in">
                {content}
            </main>
            <Footer />
        </div>
    );
}