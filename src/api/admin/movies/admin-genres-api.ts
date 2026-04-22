import axiosClient from "@/api/axios-client";
import type { GenreResponse } from "@/types/admin/movies/genres-type";

export const getGenresAdmin = async (): Promise<GenreResponse[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/genres")
    return response.data
}

export const insertGenreAdmin = async (name: string): Promise<GenreResponse> => {
    const response = await axiosClient.post("/api/admin/dashboard/genres", { name })
    return response.data
}

export const updateGenreAdmin = async ({id, name}: {id: string, name: string}): Promise<GenreResponse> => {
    const response = await axiosClient.put(`/api/admin/dashboard/genres/${id}`, { name })
    return response.data
}

export const deleteGenreAdmin = async (id: string): Promise<void> => {
    await axiosClient.delete(`/api/admin/dashboard/genres/${id}`)
}