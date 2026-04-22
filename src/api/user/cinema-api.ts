import axiosClient from "../axios-client";
import type { CinemasProps } from "@/types/user/cinema-type";

export const getCinemaByCity = async (city_id: number): Promise<CinemasProps[]> => {
    const response = await axiosClient.get("/api/cinema/", {
        params: {
            city_id
        }
    })
    return response.data
}

export const getCinemaSpecificInfo = async (city_id: number, cinemaId: string, date: string) => {
    const response = await axiosClient.get("/api/cinema/", {
        params: {
            cinemaId,
            date,
            city_id
        }
    }) 
    return response.data
}