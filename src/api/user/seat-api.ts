import axiosClient from "../axios-client";

export const expireSeatPayment = async (sessionId: string) => {
    const response = await axiosClient.post("/api/seats", {sessionId})
    return response.data
}

export const getLockedSeat = async (showTimeId: string): Promise<string[]> => {
    const response = await axiosClient.get("/api/seats", {params: {showTimeId}})
    return response.data
}