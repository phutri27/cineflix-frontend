import axiosClient from "@/api/axios-client";

export interface SeatTypeProp {
    id: string
    price: number,
    seat_type: string,
    cinemaId: string
}
export const getAdminSeatTypesByCinema = async (cinema_id: string): Promise<SeatTypeProp[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/seat-type", {
        params: {
            cinema_id
        }
    })
    return response.data
}

export const insertAdminSeatType = async (data: SeatTypeProp) => {
    await axiosClient.post("/api/admin/dashboard/seat-type", data)
}
    
export const updateAdminSeatType = async ({id, data}: {id: string, data: SeatTypeProp}) => {
    await axiosClient.put(`/api/admin/dashboard/seat-type/${id}`, data)
}

export const deleteAdminSeatType = async (id: string) => {
    await axiosClient.delete(`/api/admin/dashboard/seat-type/${id}`)
}