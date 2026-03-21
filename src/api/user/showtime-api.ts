import axiosClient from "../axios-client";


export interface ShowTimeResponse {
    id: string
    name: string
    showtimes: {id: string, startTime: Date, screenId: string, screenName: string}[]
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