import axiosClient from "../axios-client";

interface RedeemVoucherProps{
    id: string,
    name: string,
    reduceAmount: number
}
export const redeemVoucher = async (voucher_code: string): Promise<RedeemVoucherProps> => {
    const response = await axiosClient.post("/api/vouchers", {voucher_code})
    return response.data
}