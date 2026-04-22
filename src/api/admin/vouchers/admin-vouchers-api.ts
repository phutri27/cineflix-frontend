import axiosClient from "@/api/axios-client";
import type { VoucherProp, VoucherResponse } from "@/types/admin/vouchers/vouchers-type";
export const getVouchers = async (): Promise<VoucherResponse[]> => {
    const res = await axiosClient.get("/api/admin/dashboard/vouchers")
    return res.data
}

export const insertVoucher = async (data: VoucherProp) => {
    const res = await axiosClient.post("/api/admin/dashboard/vouchers", data)
    return res.data
}

export const updateVoucher = async ({id, data}: {id: string, data: VoucherProp}) => {
    const res = await axiosClient.put(`/api/admin/dashboard/vouchers/${id}`, data)
    return res.data
}

export const deleteVoucher = async (id: string) => {
    const res = await axiosClient.delete(`/api/admin/dashboard/vouchers/${id}`)
    return res.data
}

