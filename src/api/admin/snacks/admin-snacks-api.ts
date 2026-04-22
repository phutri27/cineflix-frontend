import axiosClient from "@/api/axios-client";
import type { SnackResponse } from "@/types/admin/snacks/snacks-type";

export const getSnacks = async (): Promise<SnackResponse[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/snacks")
    return response.data
}

export const createSnack = async (data: FormData) => {
    const response = await axiosClient.post("/api/admin/dashboard/snacks", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const updateSnack = async ({id, data}: {id: string, data: FormData}) => {
    const response = await axiosClient.put(`/api/admin/dashboard/snacks/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const deleteSnack = async (id: string) => {
    const response = await axiosClient.delete(`/api/admin/dashboard/snacks/${id}`)
    return response.data
}