import { adminCityApi } from "@/api";
import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import type { CityResponse } from "@/types/admin/cinema/city-type";
export const useGetAdminCities = (options?: Omit<UseQueryOptions<CityResponse[]>, 'queryKey'| 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["admin-cities"],
        queryFn: adminCityApi.getAllCitiesApi,
        refetchOnWindowFocus: false
    })
}

export const useInsertAdminCity = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminCityApi.insertCityApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cities"]})
        }
    })
}

export const useUpdateAdminCity = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminCityApi.updateCityApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cities"]})
        }
    })
}

export const useDeleteAdminCity = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminCityApi.deleteCityApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cities"]})
        }
    })
}