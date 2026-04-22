import axiosClient from "@/api/axios-client";
import type { UserResponse } from "@/types/admin/users/user-type";

export const getUsers = async (): Promise<UserResponse[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/users")
    return response.data
}