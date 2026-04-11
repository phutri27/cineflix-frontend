import axiosClient from "@/api/axios-client";

export interface Showtime {
    id: string;
    screenId: string;
    movieId: string;
    startTime: Date;
}

export interface ShowTimeChange {
    screenId: string
    movieId: string
    startTime: string
}
export const getShowtimesByScreenId = async (screenId: string, movieId: string): Promise<Showtime[]> => {
    const response = await axiosClient.get(`/api/admin/dashboard/showtimes`, {
        params: {
            screenId,
            movieId
        }
    });
    return response.data;
}

export const createShowtimeApi = async (data: ShowTimeChange[]) => {
    const response = await axiosClient.post(`/api/admin/dashboard/showtimes`, {data});
    return response.data;
}

export const updateShowtimeApi = async ({id, data}: {id: string, data: ShowTimeChange}) => {
    const response = await axiosClient.patch(`/api/admin/dashboard/showtimes/${id}`, {data})
    return response.data;
}

export const deleteShowtimeApi = async (id: string) => {
    const response = await axiosClient.delete(`/api/admin/dashboard/showtimes/${id}`);
    return response.data;
}