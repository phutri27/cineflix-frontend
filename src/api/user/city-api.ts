import axiosClient from "../axios-client";
import type { CityResponse } from "@/types/admin/cinema/city-type";
export const getCity = async () => {
    const response = await axiosClient.get<CityResponse[]>("/api/city")
    return response.data
}