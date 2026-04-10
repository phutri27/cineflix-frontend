import * as cities from "@/api/admin/cinema/admin-city-api";
import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
export const useGetAdminCities = (options?: Omit<UseQueryOptions<cities.CityResponse[]>, 'queryKey'| 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["admin-cities"],
        queryFn: cities.getAllCitiesApi,
        refetchOnWindowFocus: false
    })
}

export const useInsertAdminCity = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: cities.insertCityApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cities"]})
        }
    })
}

export const useUpdateAdminCity = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: cities.updateCityApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cities"]})
        }
    })
}

export const useDeleteAdminCity = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: cities.deleteCityApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cities"]})
        }
    })
}