import axiosClient from "../../axios-client";
import type { MovieResponse } from "@/types/admin/movies/movie-type";


export const adminGetMovieApi = async (unActive?: boolean): Promise<MovieResponse[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/movies", {
        params:{
            unActive
        }
    })
    return response.data
}

export const adminGetSpecificMovie = async (id: string): Promise<MovieResponse> => {
    const response = await axiosClient.get(`/api/admin/dashboard/movies/${id}`)
    return response.data
}

export const adminInsertMovieApi = async (formData: FormData): Promise<MovieResponse> => {
    const response = await axiosClient.post("/api/admin/dashboard/movies", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const adminUpdateMovieApi = async ({id, formData}: {id: string, formData: FormData}): Promise<MovieResponse> => {
    const response = await axiosClient.put(`/api/admin/dashboard/movies/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const adminPatchMovieActive = async ({id, isActive}: {id: string, isActive: boolean}): Promise<{message: string}> => {
    const response = await axiosClient.patch(`/api/admin/dashboard/movies/${id}`, {isActive})
    return response.data
}

export const adminDeleteMovieApi = async (id: string): Promise<void> => {
    await axiosClient.delete(`/api/admin/dashboard/movies/${id}`)
}
