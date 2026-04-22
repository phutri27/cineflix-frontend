import axiosClient from "../axios-client";
import type { SnackProps } from "@/types/user/snacks-type";
export const getUserSnacks = async (): Promise<SnackProps[]> => {
    const response = await axiosClient.get("/api/snacks")
    return response.data
}