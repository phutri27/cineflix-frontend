import axiosClient from "../axios-client";

export interface ShowTimeResponse {
    id: string
    name: string
    showtimes: {id: string, startTime: Date, screenId: string, screenName: string}[]
}

export interface ShowtimeProp {
    screenId: string
    startTime: Date
}

export interface SpecificShowTimeResponse {
    id: string
    startTime: Date
    screen: {
        id: string
        name: string,
        seats: {
            id: string
            row: string
            number: number
            seat_typeId: string
        }[],
        cinema: {
            name: string
        }
    }
    movie: {
        id: string
        title: string
        rated: string
        posterUrl: string
    }
}
export const showTimeApi = async (movieId: string, date: string, cityId: string): Promise<ShowTimeResponse[]> => {
    const response = await axiosClient.get("/api/showtime", {
        params: {
            movieId,
            date,
            cityId
        }
    })
    return response.data
}

export const getSpecificShowTimeApi = async (showTimeId: string): Promise<SpecificShowTimeResponse> => {
    const response = await axiosClient.get(`/api/showtime/${showTimeId}`)
    return response.data
}