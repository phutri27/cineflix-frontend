import axiosClient from "@/api/axios-client";
import type { CinemaRevenueProp, MovieRevenueProp, UserRevenueProp } from "@/types/admin/transaction/transaction-type";

export const getCinemaRevenue = async (): Promise<CinemaRevenueProp[]> => {
    const response = await axiosClient.get("/api/transaction/cinemas")
    return response.data
}

export const getMoviesRevenue = async (): Promise<MovieRevenueProp[]> => {
    const response = await axiosClient.get("/api/transaction/movies")
    return response.data
}

export const getUsersRevenue = async (): Promise<UserRevenueProp[]> => {
    const response = await axiosClient.get("/api/transaction/users")
    return response.data
}