import { useMutation } from "@tanstack/react-query";
import { redeemVoucher } from "@/api/user/voucher-api";

export const useRedeemVoucher = () => {
    return useMutation({
        mutationFn: redeemVoucher
    })
}

