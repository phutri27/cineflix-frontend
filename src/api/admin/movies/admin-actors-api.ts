import axiosClient from "@/api/axios-client"
import type { ActorResponse } from "@/types/admin/movies/actors-type"

export const adminGetActorsApi = async (): Promise<ActorResponse[]> => {
    const response = await axiosClient.get("/api/admin/dashboard/actors")
    return response.data
}

export const adminInsertActorApi = async (name: string): Promise<ActorResponse> => {
    const response = await axiosClient.post("/api/admin/dashboard/actors", { name })
    return response.data
}

export const adminUpdateActorApi = async ({id, name}: {id: string, name: string}): Promise<ActorResponse> => {
    const response = await axiosClient.put(`/api/admin/dashboard/actors/${id}`, { name })
    return response.data
}

export const adminDeleteActorApi = async (id: string): Promise<void> => {
    await axiosClient.delete(`/api/admin/dashboard/actors/${id}`)
}
