import axiosClient from "../axios-client";
import type { ShowTimeResponse, SpecificShowTimeResponse } from "@/types/user/showtime-type";
export const showTimeApi = async (movieId: string, date: string, cityId: string): Promise<ShowTimeResponse[]> => {
    const response = await axiosClient.get("/api/showtime", {
        params: {
            movieId,
            date,
            cityId
        }
    })
    return response.data
}

export const getSpecificShowTimeApi = async (showTimeId: string): Promise<SpecificShowTimeResponse> => {
    const response = await axiosClient.get(`/api/showtime/${showTimeId}`)
    return response.data
}