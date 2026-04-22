import axiosClient from "../axios-client";
import type { SeatTypeDetail } from "@/types/user/seatType-type";

export const getSeatType = async (cinema_id: string): Promise<SeatTypeDetail[]> => {
    const response = await axiosClient.get(`api/seat-type/`, {
        params:{
            cinema_id
        }
    })
    return response.data
}