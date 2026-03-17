import axiosClient from "@/api/axios-client";

interface SeatType {
    price: number,
    seat_type: string,
    cinemaId: string
}

export interface SeatTypeProp extends SeatType {
    id: string
}

export const getAdminSeatTypesByCinema = async (cinema_id: string): Promise<SeatTypeProp[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/seat-type", {
        params: {
            cinema_id
        }
    })
    return response.data
}

export const insertAdminSeatType = async (data: SeatType) => {
    await axiosClient.post("/api/admin/dashboard/seat-type", data)
}
    
export const updateAdminSeatType = async ({id, data}: {id: string, data: SeatType}) => {
    await axiosClient.put(`/api/admin/dashboard/seat-type/${id}`, data)
}

export const deleteAdminSeatType = async (id: string) => {
    await axiosClient.delete(`/api/admin/dashboard/seat-type/${id}`)
}