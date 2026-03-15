import { useQuery, useMutation, type UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import  * as cinemasApi from "@/api/admin/cinema/admin-cinema-api";

export const useGetAdminCinema = (city_id?: number, options?:  Omit<UseQueryOptions<cinemasApi.CinemaResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<cinemasApi.CinemaResponse[]>({
        ...options,
        queryKey: ["admin-cinemas", city_id],
        queryFn: () => cinemasApi.getAllCinemasApi(city_id)
    })
}

export const useGetSpecificAdminCinema = (cinemaId: string, options?:  Omit<UseQueryOptions<cinemasApi.CinemaDetailResponse>, 'queryKey' | 'queryFn'>) => {
    return useQuery<cinemasApi.CinemaDetailResponse>({
        ...options,
        queryKey: ["admin-cinema", cinemaId],
        queryFn: () => cinemasApi.getSpecificCinemaApi(cinemaId)
    })
}
export const useAdminInsertCinema = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: cinemasApi.insertCinemaApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cinemas"]})
        }
    })
}

export const useAdminUpdateCinema = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: cinemasApi.updateCinemaApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cinemas"]})
        }
    })
}

export const useAdminDeleteCinema = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: cinemasApi.deleteCinemaApi,
        onMutate: async (deletedCinemaId) => {
            await queryClient.cancelQueries({ queryKey: ['admin-cinemas'] })
            const previousCinemas = queryClient.getQueryData(['admin-cinemas'])
            queryClient.setQueryData<cinemasApi.CinemaResponse[]>(['admin-cinemas'], (old) => {
                if (!old) return []
                return old.filter((cinema) => cinema.id !== deletedCinemaId)
            })
            return { previousCinemas }
        },
        onError: (err, deletedCinemaId, onMutateResult) => {
            queryClient.setQueryData(['admin-cinemas'], onMutateResult!.previousCinemas)
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ['admin-cinemas'] }),
    })
}