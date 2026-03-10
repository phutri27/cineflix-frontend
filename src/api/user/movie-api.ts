import axiosClient from "../axios-client";
import type { MovieResponse } from "../admin/types/movie-response";

export const movieAPi = async (): Promise<MovieResponse[]> => {
    const response = await axiosClient.get("/api/movies/showing_movies")
    return response.data
}