import axiosClient from "@/api/axios-client";
import type { MovieResponse } from "@/types/admin/movies/movie-type";

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