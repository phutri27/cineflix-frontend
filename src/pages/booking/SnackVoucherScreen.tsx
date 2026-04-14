import { useSnacks } from "@/hooks/user/use-snack";
import { useRedeemVoucher } from "@/hooks/user/use-voucher";
import { ErrorMessages } from "@/utils/error-messages";
import { useState } from "react";
import { useBookingStore } from "@/utils/booking-store";
import type { SnackData } from "@/utils/booking-store";

interface SnackVoucherScreenProps {
    snackQuantities: SnackData[]
}

export default function SnackVoucherScreen({snackQuantities}: SnackVoucherScreenProps){
    const [voucherCode, setVoucherCode] = useState<string>("")

    const handleIncrementQty = useBookingStore((state) => state.incrementSnackQuantities)
    const handleDecrementQty = useBookingStore((state) => state.decrementSnackQuantites)
    const setVoucherQuantity = useBookingStore((state) => state.setVoucherQuantity)

    const { data: snacks, isLoading, isError, error } = useSnacks()
    const { data: voucherData, 
        mutate: redeem, 
        isPending: isRedeeming, 
        isError: isRedeemError,
         error: redeemError, 
         isSuccess } = useRedeemVoucher()

    const handleVoucherCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherCode(e.target.value)
    }

    const handleRedeem = (e: React.SubmitEvent) => {
        e.preventDefault()
        redeem(voucherCode, {
            onSuccess: (data) => {
                setVoucherQuantity(data.id, data.reduceAmount)
            }
        })
    }

    return(
        <div className="bg-[#141414] text-white p-6 md:p-10 font-sans">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-10 border-b border-neutral-700 pb-6">
                Snacks & Vouchers
            </h1>

            {/* Voucher Section */}
            <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-white mb-4">Redeem Voucher</h2>
                <form onSubmit={handleRedeem} className="flex gap-3">
                    <div className="flex-1">
                        {isRedeemError && <div className="mb-2"><ErrorMessages error={redeemError}/></div>}
                        <input 
                            type="text"  
                            name="voucher_code"
                            id="voucher_code"
                            value={voucherCode} 
                            onChange={handleVoucherCodeChange} 
                            placeholder="Enter voucher code"
                            className="w-full bg-neutral-800 border border-neutral-600 rounded px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isRedeeming}
                        className="px-5 py-2 text-sm font-bold rounded bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 transition-colors shrink-0"
                    >
                        {isRedeeming ? "Redeeming..." : "Redeem"}
                    </button>
                </form>
                {isSuccess && voucherData && (
                    <div className="mt-4 bg-green-900/30 border border-green-700 rounded p-3 text-sm">
                        <p className="text-green-400 font-semibold">Voucher redeemed successfully!</p>
                        <p className="text-neutral-300 mt-1">{voucherData.name} — <span className="text-green-400 font-bold">VND {voucherData.reduceAmount} off</span></p>
                    </div>
                )}
            </div>

            {/* Snacks Section */}
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-white mb-4">Available Snacks</h2>
                {isLoading && <p className="text-neutral-400">Loading snacks...</p>}
                {isError && <ErrorMessages error={error} />}
                {snacks && snacks.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {snacks.map(snack => {
                            const currentQuantity = snackQuantities.find((s) => s.snackId === snack.id)?.quantity || 0
                            return (
                                <div 
                                    key={snack.id} 
                                    className="flex items-center gap-4 bg-neutral-900/50 border border-neutral-700 rounded-lg p-4"
                                >
                                    <img 
                                        src={snack.imageUrl} 
                                        alt={snack.name} 
                                        className="h-16 w-16 rounded object-cover shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white truncate">{snack.name}</p>
                                        <p className="text-sm text-neutral-400">VND {snack.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button 
                                            onClick={() => handleDecrementQty(snack.id)}
                                            className="h-8 w-8 flex items-center justify-center rounded border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition-colors font-bold"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold text-white">
                                            {currentQuantity}
                                        </span>
                                        <button 
                                            onClick={() => handleIncrementQty(snack.id, snack.price)}
                                            className="h-8 w-8 flex items-center justify-center rounded border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition-colors font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    !isLoading && <p className="text-neutral-500">No snacks available.</p>
                )}
            </div>
        </div>
    )
}