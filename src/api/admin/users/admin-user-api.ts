import axiosClient from "@/api/axios-client";

export interface UserResponse {
    email: string,
    first_name: string,
    last_name: string,
    profile: {
        spending_total: number,
        member_rank: string
    }
}

export const getUsers = async (): Promise<UserResponse[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/users")
    return response.data
}