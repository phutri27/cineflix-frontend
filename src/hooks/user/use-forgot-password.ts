import { useMutation } from "@tanstack/react-query";
import { passwordApi } from "@/api";

export const useForgotPassword = () => {
    const forgotPasswordMutation = useMutation({
        mutationFn: passwordApi.forgotPasswordApi,
    });
    return forgotPasswordMutation;
}

export const useConfirmForgotPasswordOTP = () => {
    const confirmChangePasswordOTP = useMutation({
        mutationFn: passwordApi.confirmChangePasswordOTPApi,
    });
    return confirmChangePasswordOTP;
}

export const useNewPasswordForForgotPassword = () => {
    const newPasswordForForgotPassword = useMutation({
        mutationFn: passwordApi.newPasswordApi,
    });
    return newPasswordForForgotPassword;
}