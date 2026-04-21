import { useState } from "react";
import { useAdminGetVouchers, useAdminDeleteVoucher } from "@/hooks/admin/vouchers/use-admin-vouchers";
import type { VoucherResponse } from "@/api/admin/vouchers/admin-vouchers-api";
import ModalComponent from "@/components/modal/Modal";
import { ErrorMessages } from "@/utils/error-messages";
import VoucherForm from "./VoucherForm";
import { Plus, Pencil, Trash2, Calendar, Percent, Package } from "lucide-react";

const modalStyle = {
    background: '#1a1a1a',
    border: '1px solid #404040',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '520px',
    width: '90%',
    maxHeight: '85vh',
    overflow: 'auto',
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
}

export default function Vouchers(){
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [voucherData, setVoucherData] = useState<VoucherResponse | null>(null)

    const {data: vouchers, isLoading, isError: isQueryError, error: queryError} = useAdminGetVouchers()
    const {mutate: deleteVoucher, isPending, isError: isDeleteError, error: deleteError} = useAdminDeleteVoucher()

    const openModal = () => setIsOpenModal(true)

    const closeModal = () => {
        setIsOpenModal(false)
        setVoucherData(null)
    }

    const handleEdit = (id: string) => {
        const vouch = vouchers?.find(v => v.id === id)
        if(!vouch) return
        setVoucherData(vouch)
        openModal()
    }

    const handleDelete = (id: string) => {
        deleteVoucher(id)
    }

    const isExpired = (date: Date) => new Date(date) < new Date()

    if (isLoading) return <div className="p-6 text-neutral-400 text-sm">Loading...</div>
    if (isQueryError) return <div className="p-6 text-red-500 text-sm">{(queryError as Error).message}</div>

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-neutral-400">
                    {vouchers?.length || 0} voucher{(vouchers?.length || 0) !== 1 && "s"}
                </p>
                <button
                    onClick={openModal}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Create Voucher
                </button>
            </div>

            {isDeleteError && <div className="mb-4"><ErrorMessages error={deleteError} /></div>}

            {vouchers && vouchers.length === 0 && (
                <p className="text-neutral-500 text-sm text-center py-8">No vouchers created yet.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vouchers?.map((voucher) => {
                    const expired = isExpired(voucher.expireAt)

                    return (
                        <div
                            key={voucher.id}
                            className={`relative border rounded-lg overflow-hidden ${
                                expired
                                    ? "bg-neutral-800/20 border-neutral-800 opacity-60"
                                    : "bg-neutral-800/40 border-neutral-700"
                            }`}
                        >
                            <div className="flex items-start justify-between p-4 pb-0">
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-green-900/30 border border-green-800 flex items-center justify-center shrink-0">
                                        <Percent className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white">{voucher.name}</h3>
                                        <p className="text-lg font-extrabold text-green-400">
                                            -{voucher.reduceAmount}%
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleEdit(voucher.id)}
                                        className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(voucher.id)}
                                        disabled={isPending}
                                        className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-red-950/50 disabled:opacity-50 transition-colors"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mx-4 my-3 border-t border-dashed border-neutral-700" />
                            <div className="px-4 pb-4 flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                    <Package className="h-3 w-3 shrink-0" />
                                    <span>Qty: <span className="text-neutral-200 font-semibold">{voucher.quantity}</span></span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                    <Calendar className="h-3 w-3 shrink-0" />
                                    <span>
                                        {new Date(voucher.startAt).toLocaleDateString()} — {new Date(voucher.expireAt).toLocaleDateString()}
                                    </span>
                                </div>
                                {expired && (
                                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-950/50 px-2 py-0.5 rounded w-fit">
                                        Expired
                                    </span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <ModalComponent openModal={isOpenModal} closeModal={closeModal} style={modalStyle}>
                <VoucherForm
                    initialData={voucherData || undefined}
                    onClose={closeModal}
                />
            </ModalComponent>
        </div>
    )
}