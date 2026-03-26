import axiosClient from "../axios-client";

export interface SnackProps{
    id: string
    name: string
    price: number
    imageUrl: string
}
export const getSnacks = async (): Promise<SnackProps[]> => {
    const response = await axiosClient.get("/api/snacks")
    return response.data
}