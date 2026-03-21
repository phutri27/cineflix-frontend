import axiosClient from "@/api/axios-client";
import type { MovieResponse } from "@/api/admin/types/movie-response";

export const movieAPi = async (status?: string, title?: string, genre?: string): Promise<MovieResponse[]> => {
    const response = await axiosClient.get("/api/movies", {
        params: {
            status,
            title,
            genre
        }
    })
    return response.data
}

export const getSpecificMovie = async (id: string): Promise<MovieResponse> => {
    const response = await axiosClient.get(`/api/movies/${id}`)
    return response.data
}