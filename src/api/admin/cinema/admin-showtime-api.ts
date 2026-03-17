import axiosClient from "@/api/axios-client";

export interface Showtime {
    id: string;
    screenId: string;
    movieId: string;
    startTime: Date;
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

export const createShowtimeApi = async (data: { screenId: string, movieId: string, startTime: string }[]) => {
    const response = await axiosClient.post(`/api/admin/dashboard/showtimes`, {data});
    return response.data;
}

export const updateShowtimeApi = async (datas: {screenId: string, cinemaId: string, movieId: string, startTime: string}[]) => {
    const data = datas.map((d) => ({
        screenId: d.screenId,
        startTime: d.startTime
    }))
    const response = await axiosClient.put(`/api/admin/dashboard/showtimes?cinemaId=${datas[0].cinemaId}&movieId=${datas[0].movieId}`,{data});
    return response.data;
}

export const deleteShowtimeApi = async (id: string) => {
    const response = await axiosClient.delete(`/api/admin/dashboard/showtimes/${id}`);
    return response.data;
}