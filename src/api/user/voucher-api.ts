import axiosClient from "../axios-client";
import type { ProfileVoucher } from "@/types/user/voucher-type";

interface RedeemVoucherProps{
    id: string,
    name: string,
    reduceAmount: number,
    maxUsed: number
}

export const redeemVoucher = async ({voucher_code, voucherIds}: {voucher_code: string, voucherIds: {id: string, quantity: number}[]}): Promise<RedeemVoucherProps> => {
    const response = await axiosClient.post("/api/vouchers", {voucher_code, voucherIds})
    return response.data
}

export const getProfileVoucher = async (page: number): Promise<ProfileVoucher> => {
    const response = await axiosClient.get("/api/customer/profile/vouchers", {
        params: {
            page
        }
    })
    return response.data
}