import axiosClient from "@/api/axios-client";

export interface DirectorResponse{
    id: string
    name: string
}

export const adminGetDirectorsApi = async (): Promise<DirectorResponse[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/directors")
    return response.data
}

export const adminInsertDirectorApi = async (name: string): Promise<DirectorResponse> => {
    const response = await axiosClient.post("/api/admin/dashboard/directors", { name })
    return response.data
}

export const adminUpdateDirectorApi = async ({id, name} : {id: string, name: string}): Promise<DirectorResponse> => {
    const response = await axiosClient.put(`/api/admin/dashboard/directors/${id}`, { name })
    return response.data
}

export const adminDeleteDirectorApi = async (id: string): Promise<void> => {
    await axiosClient.delete(`/api/admin/dashboard/directors/${id}`)
}   
