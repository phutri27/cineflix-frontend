import { useState } from 'react'
import Page from '@/components/Page'
import { useUserStore, usePages, useProfile, useVoucher } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'
import {ErrorMessages} from '@/utils/error-messages'
import { Ticket } from 'lucide-react'
export default function ProfileVoucher(){
    const queryClient = useQueryClient()
    const [voucherCode, setVoucherCode] = useState<string>("")
    const {page,
    pageGroup, 
    handleChoosePage,
    incrementPageGroup,
    decrementPageGroup } = usePages.useGetPages()

    const userId = useUserStore.useUserRoleStore((state) => state.id)

    const { data: vouchers, isLoading, isError, error } = useVoucher.useGetProfileVoucher(userId, page)
    const { mutate: insertVoucher, isPending, isError: isInsertError, error: insertError } = useProfile.useInsertProfileVoucher()

    const handleVoucherCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherCode(e.target.value)
    }

    const handleRedeem = (e: React.FormEvent) => {
        e.preventDefault()
        insertVoucher(voucherCode, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["profile_voucher", userId]})
                setVoucherCode("")
            }
        })
    }

    if (isLoading) {
        return (
            <div className="p-8 flex justify-center items-center h-full min-h-[400px]">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-neutral-400 font-medium">Loading vouchers...</p>
                </div>
            </div>
        )
    }

    if (isError) {
        return <div className="p-8 text-red-500">{(error as Error).message}</div>
    }

    return (
        <div className="p-6 md:p-8 animate-fade-in flex flex-col h-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-neutral-800 pb-4">
                My Vouchers
            </h2>
            {isInsertError && <div className="mb-6"><ErrorMessages error={insertError} /></div>}
            <form onSubmit={handleRedeem} className="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl">
                <input 
                    type="text" 
                    value={voucherCode} 
                    onChange={handleVoucherCodeChange} 
                    placeholder="Enter voucher code" 
                    className="flex-1 bg-neutral-800/50 border border-neutral-700 text-white rounded-lg px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all uppercase placeholder:normal-case placeholder:text-neutral-500"
                />
                <button 
                    type="submit" 
                    disabled={isPending || !voucherCode.trim()} 
                    className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-3 px-8 rounded-lg transition-colors whitespace-nowrap"
                >
                    {isPending ? "Redeeming..." : "Redeem"}
                </button>
            </form>
            {vouchers && vouchers.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {vouchers.data.map((voucher) => (
                        <div key={voucher.voucher.id} className="relative bg-neutral-800/30 border border-neutral-700 rounded-xl overflow-hidden flex flex-col hover:border-neutral-500 transition-colors shadow-lg">
                            <div className="h-1.5 w-full bg-gradient-to-r from-red-600 to-red-900"></div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1 pr-4">
                                        <h3 className="text-lg font-bold text-white leading-tight mb-1">
                                            {voucher.voucher.name}
                                        </h3>
                                        <p className="text-red-500 font-bold text-xl">
                                            -{voucher.voucher.reduceAmount.toLocaleString()} <span className="text-sm">%</span>
                                        </p>
                                    </div>
                                    <div className="bg-neutral-900 border border-neutral-600 text-white font-black px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1.5 shadow-inner">
                                        <Ticket className="w-4 h-4 text-neutral-400" />
                                        x{voucher.quantity}
                                    </div>
                                </div>
                                <div className="bg-neutral-900/50 rounded border border-neutral-800 px-3 py-2 text-xs text-neutral-400 font-medium flex justify-between items-center">
                                    <span>Valid: {new Date(voucher.voucher.startAt).toLocaleDateString()}</span>
                                    <span>→</span>
                                    <span>{new Date(voucher.voucher.expireAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-12 text-neutral-500 bg-neutral-900/20 border border-neutral-800 border-dashed rounded-xl mb-8">
                    <Ticket className="w-12 h-12 mb-3 opacity-20" />
                    <p>You don't have any vouchers yet.</p>
                </div>
            )}
            {vouchers && Number(vouchers.meta.totalPages) > 1 && (
                <div className="mt-auto pt-6 border-t border-neutral-800 flex justify-center">
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
    )
}