import axiosClient from "@/api/axios-client";

type movieOption = {
    id: string
    title: string
    posterUrl: string
}

export type screenOption = {
    id: string
    name: string
    cinemaId: string
}

type SeatType = {
    id: string
    price : number
    seat_type: string
    cinemaId: string
}

interface CinemaInsertProp {
    name: string
    cityId: number
    address: string
    hotline: string
}

export interface CinemaResponse{
    id: string
    name: string
    cityId: number
    address: string
    hotline: string
}

export interface CinemaDetailResponse extends CinemaResponse{
    seatType: SeatType[]
    movies: movieOption[]
    screens: screenOption[]
}

export const getAllCinemasApi = async (city_id?: number): Promise<CinemaResponse[]> => {
    const response = await axiosClient.get<CinemaResponse[]>("/api/admin/dashboard/cinemas", {
        params: {
            city_id
        }
    })
    return response.data
}

export const getSpecificCinemaApi = async (cinemaId: string): Promise<CinemaDetailResponse> => {
    const response = await axiosClient.get<CinemaDetailResponse>(`/api/admin/dashboard/cinemas`, {
        params: {
            cinemaId
        }
    })
    return response.data
}

export const insertCinemaApi = async (data: CinemaInsertProp): Promise<void> => {
    await axiosClient.post("/api/admin/dashboard/cinemas", data)
}

export const updateCinemaApi = async ({data, cinema_id}: { data: CinemaInsertProp, cinema_id: string}): Promise<void> => {
    await axiosClient.put(`/api/admin/dashboard/cinemas/${cinema_id}`, data)
}

export const insertMovieInCinemaApi = async ({cinema_id, movieIds}: { cinema_id: string, movieIds: string[]}): Promise<void> => {
    await axiosClient.put(`/api/admin/dashboard/cinemas/movies/${cinema_id}`, {movieIds})
}

export const deleteMovieInCinemaApi = async ({cinema_id, movieId}: { cinema_id: string, movieId: string}): Promise<void> => {
    await axiosClient.put(`/api/admin/dashboard/cinemas/movies/${cinema_id}/${movieId}`)
}

export const deleteCinemaApi = async (cinema_id: string): Promise<void> => {
    await axiosClient.delete(`/api/admin/dashboard/cinemas/${cinema_id}`)
}