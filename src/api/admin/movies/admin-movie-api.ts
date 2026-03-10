import axiosClient from "../../axios-client";
import type { MovieResponse } from "../types/movie-response";

export interface MovieFormInput{
    title: string
    plot: string
    filename: File[]
    duration: number
    premiere_date: Date | string,
    rated: string
    genre_option : {value: string, label: string}[]
    actors: {value: string, label: string}[]
    directors: {value: string, label: string}[]
}

export const adminGetMovieApi = async (): Promise<MovieResponse[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/movies")
    return response.data
}

export const adminGetSpecificMovie = async (id: string): Promise<MovieResponse> => {
    const response = await axiosClient.get(`/api/admin/dashboard/movie/${id}`)
    return response.data
}

export const adminInsertMovieApi = async (formData: FormData): Promise<MovieResponse> => {
    const response = await axiosClient.post("/api/admin/dashboard/movie", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const adminUpdateMovieApi = async ({id, formData}: {id: string, formData: FormData}): Promise<MovieResponse> => {
    const response = await axiosClient.put(`/api/admin/dashboard/movie/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const adminDeleteMovieApi = async (id: string): Promise<void> => {
    await axiosClient.delete(`/api/admin/dashboard/movie/${id}`)
}
