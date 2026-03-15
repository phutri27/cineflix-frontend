import axiosClient from "@/api/axios-client";

export const getAdminSeatsByScreen = async (screen_id: string) => {
    const response = await axiosClient.get("/api/admin/dashboard/seats", {
        params: {
            screen_id
        }
    })
    return response.data
}

export const insertAdminSeat = async (data: any) => {
    await axiosClient.post("/api/admin/dashboard/seats", data)
}
    
export const updateAdminSeat = async (id: string, data: any) => {
    await axiosClient.put(`/api/admin/dashboard/seats/${id}`, data)
}

export const deleteAdminSeat = async (id: string) => {
    await axiosClient.delete(`/api/admin/dashboard/seats/${id}`)
}