import axiosClient from "../axios-client";

export const logout = async (): Promise<{logout: boolean}> => {
    const response = await axiosClient.post("/api/logout")
    return response.data
}