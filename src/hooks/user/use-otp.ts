import { useMutation } from "@tanstack/react-query";
import { otpApi } from "@/api";
export const useOTP = () =>{
    return useMutation({
        mutationFn: otpApi.OTPapi,
    })
}

export const useResendSignupOTP = () => {
    return useMutation({
        mutationFn: otpApi.resendOTPSignUp
    })
}
