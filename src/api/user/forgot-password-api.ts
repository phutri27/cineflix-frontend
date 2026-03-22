import axiosClient from "../axios-client";

export const forgotPasswordApi = async (email: string) => {
    const response = await axiosClient.post("/api/password/forgot", { email })
    return response.data
}

export const confirmChangePasswordOTPApi = async (data : {email: string, otp: string}) => {
    const response = await axiosClient.post("/api/password/otp", data)
    return response.data
}

export const newPasswordApi = async (data: {pw: string, confirm_pw: string, email: string, resetToken:string}) => {
    const response = await axiosClient.post("/api/password/forgot/new", data)
    return response.data
}