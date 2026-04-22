import axiosClient from "@/api/axios-client";
import type { CityResponse } from "@/types/admin/cinema/city-type";


export const getAllCitiesApi = async (): Promise<CityResponse[]> => {
    const response = await axiosClient.get<CityResponse[]>("/api/admin/dashboard/cities")
    return response.data
}

export const insertCityApi = async (name: string): Promise<void> => {
    await axiosClient.post("/api/admin/dashboard/cities", { name })
}

export const updateCityApi = async ({cityId, name}: {cityId: number, name: string}): Promise<void> => {
    await axiosClient.put(`/api/admin/dashboard/cities/${cityId}`, { name })
}

export const deleteCityApi = async (cityId: number): Promise<void> => {
    await axiosClient.delete(`/api/admin/dashboard/cities/${cityId}`)
}