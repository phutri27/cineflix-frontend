import { useState } from "react";
import { useAdminGetVouchers, useAdminDeleteVoucher } from "@/hooks/admin/vouchers/use-admin-vouchers";
import type { VoucherResponse } from "@/api/admin/vouchers/admin-vouchers-api";
import ModalComponent from "@/components/modal/Modal";
import { ErrorMessages } from "@/utils/error-messages";
import VoucherForm from "./VoucherForm";
export default function Vouchers(){
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [voucherData, setVoucherData] = useState<VoucherResponse | null>(null)

    const {data: vouchers, isLoading, isError: isQueryError, error: queryError} = useAdminGetVouchers()
    const {mutate: deleteVoucher, isPending, isError: isDeleteError, error: deleteError} = useAdminDeleteVoucher()

    const openModal = () => {
        setIsOpenModal(true)
    }

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

    if (isLoading) return <div>Loading...</div>
    if (isQueryError) return <div>{(queryError as Error).message}</div>

    return (
        <div>
            <div>
                {isDeleteError && <ErrorMessages error={deleteError} />}
            </div>
            <button onClick={openModal}>Create Voucher</button>
            <div>
                {vouchers && vouchers.map((voucher) => (
                    <div key={voucher.id}>
                        <h3>{voucher.name}</h3>
                        <p>Reduce Amount: {voucher.reduceAmount}</p>
                        <p>Quantity: {voucher.quantity}</p>
                        <p>Start At: {new Date(voucher.startAt).toLocaleDateString()}</p>
                        <p>Expire At: {new Date(voucher.expireAt).toLocaleDateString()}</p>
                        <button onClick={() => handleEdit(voucher.id)} disabled={isPending}>{isPending ? "Updating..." : "Update"}</button>
                        <button onClick={() => handleDelete(voucher.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div>
                <ModalComponent openModal={isOpenModal} closeModal={closeModal}>
                    <VoucherForm 
                    initialData={voucherData || undefined} 
                    onClose={closeModal} />
                </ModalComponent>
            </div>
        </div>
    )
}