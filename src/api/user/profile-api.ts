import axiosClient from "../axios-client";

export interface ProfileProps{
    spending_total : number;
    member_rank: string
}

export const getProfile = async (): Promise<ProfileProps> => {
    const response = await axiosClient.get("/api/customer/profile")
    return response.data
}

export const updateProfile = async (data: {password: string, first_name: string, last_name: string}) => {
    const response = await axiosClient.put("/api/customer/profile", data)
    return response.data
}

export const changePassword = async (data: {password: string}) => {
    const response = await axiosClient.post("/api/password/change", data)
    return response.data
}

export const confirmChangePasswordOTP = async (data: {otp: string}) => {
    const response = await axiosClient.post("/api/password/otp", data)
    return response.data
}

export const newPassword = async (data: {pw: string, confirm_pw: string, resetToken:string}) => {
    console.log(data)
    const response = await axiosClient.post("/api/password/new", data)
    return response.data
}