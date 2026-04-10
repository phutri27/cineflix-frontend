import { forgotPasswordApi, confirmChangePasswordOTPApi, newPasswordApi } from "@/api/user/forgot-password-api";
import { useMutation } from "@tanstack/react-query";


export const useForgotPassword = () => {
    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPasswordApi,
    });
    return forgotPasswordMutation;
}

export const useConfirmForgotPasswordOTP = () => {
    const confirmChangePasswordOTP = useMutation({
        mutationFn: confirmChangePasswordOTPApi,
    });
    return confirmChangePasswordOTP;
}

export const useNewPasswordForForgotPassword = () => {
    const newPasswordForForgotPassword = useMutation({
        mutationFn: newPasswordApi,
    });
    return newPasswordForForgotPassword;
}