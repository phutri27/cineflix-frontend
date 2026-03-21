import axiosClient from "../axios-client";
import { type CityResponse } from "../admin/cinema/admin-city-api";
export const getCity = async () => {
    const response = await axiosClient.get<CityResponse[]>("/api/city")
    return response.data
}