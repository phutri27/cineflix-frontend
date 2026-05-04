import axiosClient from "../axios-client"

interface OTPobj {
    email: string
    otp: string
}
export const OTPapi = async (otp: OTPobj) => {
    const response = await axiosClient.post("/api/signup/otp", otp)
    return response.data
}

export const resendOTPSignUp = async (email: string) => {
    const response = await axiosClient.post("/api/signup/otp-resend", { email })
    return response.data
}