import axiosClient from "@/api/axios-client";

export type SeatType = {
    row: string
    number: number
    seat_typeId: string
}

export interface ScreenTypeProp {
    name: string
    cinema_id: string
    seats: SeatType[]
}

export interface ScreenByMovieAndCinemaResponse {
    id: string
    name: string
    cinemaId: string
    showtimes: {
        id: string
        startTime: Date
        movieId: string
        screenId: string
    }[]
}


export interface ScreensProp {
    id: string
    name: string
    cinemaId: string
    showtimes: {
        id: string,
        startTime: Date
    }[]
}


export const getAdminScreensByCinema = async (cinema_id: string): Promise<ScreensProp[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/screens", {
        params: {
            cinema_id,
        }
    })
    return response.data
}

export const getAdminScreenByMovieAndCinema = async (cinema_id: string, movie_id: string): Promise<ScreenByMovieAndCinemaResponse[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/screens", {
        params: {
            cinema_id,
            movie_id
        }
    })
    return response.data
}

export const getAdminSeatByScreen = async (screen_id: string) => {
    const response = await axiosClient.get("/api/admin/dashboard/screens", {
        params: {
            screen_id
        }
    })
    return response.data
}

export const insertAdminScreen = async (data: ScreenTypeProp) => {
    await axiosClient.post("/api/admin/dashboard/screens", data)
}

export const updateAdminScreen = async ({id, data}: {id: string, data: ScreenTypeProp}) => {
    await axiosClient.put(`/api/admin/dashboard/screens/${id}`, data)
}

export const deleteAdminScreen = async (id: string) => {
    await axiosClient.delete(`/api/admin/dashboard/screens/${id}`)
}