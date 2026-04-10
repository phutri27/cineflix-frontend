import axiosClient from "../axios-client";

export const getUserId = async (userId: string): Promise<{isLogin: boolean}> => {
    const response = await axiosClient.get("/api/user", {
        params:{
            userId
        }
    })
    return response.data
}