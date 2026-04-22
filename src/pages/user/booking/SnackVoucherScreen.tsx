import { ErrorMessages } from "@/utils/error-messages";
import { useState } from "react";
import type { SnackData } from "@/types/user/booking-type";
import { format } from "date-fns";
import Page from "@/components/Page";
import { useQueryClient } from "@tanstack/react-query";
import type { ProfileVoucher } from "@/types/user/voucher-type";
import { useSnack, useVoucher, useBookedStore, useUserStore, usePages } from "@/hooks";

interface SnackVoucherScreenProps {
    snackQuantities: SnackData[]
}
export default function SnackVoucherScreen({snackQuantities}: SnackVoucherScreenProps){
    const [voucherCode, setVoucherCode] = useState<string>("")
    const {  page,
        pageGroup, 
        handleChoosePage,
        incrementPageGroup,
        decrementPageGroup } = usePages.useGetPages()

    const userId = useUserStore.useUserRoleStore((state) => state.id)
    const handleIncrementQty = useBookedStore.useBookingStore((state) => state.incrementSnackQuantities)
    const handleDecrementQty = useBookedStore.useBookingStore((state) => state.decrementSnackQuantites)
    const setVoucherQuantity = useBookedStore.useBookingStore((state) => state.setVoucherQuantity)
    const voucherQuantity = useBookedStore.useBookingStore((state) => state.voucherQuantity)
    const removeVoucher = useBookedStore.useBookingStore((state) => state.removeVoucher)

    const queryClient = useQueryClient()
    const { data: snacks, isLoading, isError, error } = useSnack.useSnacks()
    const { 
        mutate: redeem, 
        isPending: isRedeeming, 
        isError: isRedeemError,
         error: redeemError, 
          } = useVoucher.useRedeemVoucher()
    
    const { data: vouchers, isFetched} = useVoucher.useGetProfileVoucher(userId, page)

    const handleVoucherCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherCode(e.target.value)
    }

    const handleRemoveVoucher = (id: string) => {
        const specificVoucher = voucherQuantity.find((voucher) => voucher.voucherId === id)
        queryClient.setQueryData(["profile_voucher", userId], (oldData: ProfileVoucher) => {
            if (!oldData) return oldData
            const updatedVouchers = oldData.data.map((voucher) => {
                if (voucher.voucher.id === id && specificVoucher && specificVoucher.voucherType === "profile") {
                    return {
                        ...voucher,
                        quantity: voucher.quantity + specificVoucher.quantity
                    }
                }
                return voucher
            })
             return {
                ...oldData,
                data: updatedVouchers
            }
        })
        removeVoucher(id)
    }

    const handleAddVoucher = (id: string, reduceAmount: number, name: string, maxUsed: number) => {
        const voucherMax = voucherQuantity.find((voucher) => voucher.voucherId === id)
        if (voucherMax?.quantity && voucherMax.quantity >= maxUsed){
            alert(`Maximum limit for this voucher is ${maxUsed} times`)
            return 
        }
        setVoucherQuantity(id, reduceAmount, name, maxUsed, "profile")
        queryClient.setQueryData(["profile_voucher", userId], (oldData: ProfileVoucher) => {
            if (!oldData) return oldData
            const updatedVouchers = oldData.data.map((voucher) => {
                if (voucher.voucher.id === id) {
                    return {
                        ...voucher,
                        quantity: voucher.quantity - 1
                    }
                }
                return voucher
            })
            return {
                ...oldData,
                data: updatedVouchers
            }
        })
    }

    const handleRedeem = (e: React.SubmitEvent) => {
        e.preventDefault()
        const voucherIds = voucherQuantity.map((voucher) => ({id: voucher.voucherId, quantity: voucher.quantity}))
        redeem({voucher_code: voucherCode, voucherIds},  {
            onSuccess: (data) => {
                const voucherMax = voucherQuantity.find((voucher) => voucher.voucherId === data.id)
                if (voucherMax?.quantity && voucherMax.quantity >= data.maxUsed){
                    alert(`Maximum limit for this voucher is ${data.maxUsed} times`)
                    return 
                } 
                setVoucherQuantity(data.id, data.reduceAmount, data.name, data.maxUsed, "redeem")
            }
        })
    }

    const pickedVoucher = voucherQuantity[0]

    return(
        <div className="bg-[#141414] text-white p-6 md:p-10 font-sans">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-10 border-b border-neutral-700 pb-6">
                Snacks & Vouchers
            </h1>
            <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-white mb-4">Redeem Voucher</h2>
                <form onSubmit={handleRedeem} className="flex gap-3">
                    <div className="flex-1">
                        {isRedeemError && <div className="mb-2 text-red-600"><ErrorMessages error={redeemError}/></div>}
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
                {voucherQuantity.length > 0 && (
                    voucherQuantity.map((voucher) => (
                        <div 
                            key={voucher.voucherId} 
                            className="mt-4 relative bg-neutral-800/40 border border-green-500/30 border-l-4 border-l-green-500 rounded-lg p-4 flex items-center justify-between shadow-lg animate-fade-in"
                        >   
                            <div className="flex flex-col pr-4">
                                <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Voucher Applied
                                </p>
                                <p className="text-white font-medium text-sm sm:text-base leading-tight">
                                    {voucher.name} 
                                    <span className="ml-2 text-green-400 font-black">
                                        {voucher.reduceAmount}% OFF
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                                <span className="bg-neutral-900 border border-neutral-700 text-neutral-300 px-2.5 py-1 rounded text-xs font-bold shadow-inner">
                                    x{voucher.quantity}
                                </span>
                                <button 
                                    onClick={() => handleRemoveVoucher(voucher.voucherId)}
                                    className="h-8 w-8 flex items-center justify-center rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all duration-200"
                                    title="Remove voucher"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))
                )}
                {isFetched && vouchers && vouchers.data.length > 0 && (
                    <div className="mt-8 border-t border-neutral-800 pt-8 max-w-4xl mx-auto">
                        <h2 className="text-xl font-bold text-white mb-6">Your Available Vouchers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {vouchers.data.map((voucher) => (
                                voucher.quantity !== 0 ? (
                                    <div key={voucher.voucher.id} className="relative bg-neutral-800/30 border border-neutral-700 rounded-xl overflow-hidden flex flex-col hover:border-neutral-500 transition-colors shadow-lg">
                                        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 to-red-900"></div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1 pr-4">
                                                    <h3 className="text-lg font-bold text-white leading-tight mb-1">
                                                        {voucher.voucher.name}
                                                    </h3>
                                                    <p className="text-red-500 font-bold text-xl">
                                                        {voucher.voucher.reduceAmount.toLocaleString()}% <span className="text-sm font-medium">OFF</span>
                                                    </p>
                                                </div>
                                                <div className="bg-neutral-900 border border-neutral-600 text-white font-black px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1.5 shadow-inner">
                                                    x{voucher.quantity}
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-end mt-2">
                                                <div className="bg-neutral-900/50 rounded border border-neutral-800 px-3 py-2 text-[10px] sm:text-xs text-neutral-400 font-medium flex gap-2 items-center">
                                                    <span>{format(new Date(voucher.voucher.startAt), "dd/MM/yy")}</span>
                                                    <span>→</span>
                                                    <span>{format(new Date(voucher.voucher.expireAt), "dd/MM/yy")}</span>
                                                </div>
                                                
                                                <button 
                                                    disabled={voucherQuantity.length > 0 && voucher.voucher.id !== pickedVoucher?.voucherId}
                                                    onClick={() => handleAddVoucher(voucher.voucher.id, voucher.voucher.reduceAmount, voucher.voucher.name, voucher.voucher.maxUsed)}
                                                    className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:border-neutral-700 disabled:cursor-not-allowed text-white font-bold h-9 w-9 rounded-full flex items-center justify-center transition-colors border border-transparent shadow-md"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            ))}
                        </div>
                        {Number(vouchers?.meta.totalPages) > 1 && (
                            <div className="flex justify-center mt-4">
                                <Page 
                                    totalPages={Number(vouchers?.meta.totalPages)}
                                    page={page}
                                    pageGroup={pageGroup}
                                    handleChoosePage={handleChoosePage}
                                    incrementPageGroup={incrementPageGroup}
                                    decrementPageGroup={decrementPageGroup}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
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