import axiosClient from "../axios-client";

export interface SeatTypeDetail {
    id: string
    price: string
    seat_type: string
}
export const getSeatType = async (cinema_id: string): Promise<SeatTypeDetail[]> => {
    const response = await axiosClient.get(`api/seat-type/`, {
        params:{
            cinema_id
        }
    })
    return response.data
}