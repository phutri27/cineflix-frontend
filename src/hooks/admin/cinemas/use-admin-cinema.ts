import { useQuery, useMutation, type UseQueryOptions, useQueryClient } from "@tanstack/react-query";
import type { CinemaResponse, CinemaDetailResponse } from "@/types/admin/cinema/cinema-type";
import { adminCinemaApi } from "@/api";

export const useGetAdminCinema = (city_id?: number, options?:  Omit<UseQueryOptions<CinemaResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<CinemaResponse[]>({
        ...options,
        queryKey: ["admin-cinemas", city_id],
        queryFn: () => adminCinemaApi.getAllCinemasApi(city_id),
        refetchOnWindowFocus: false
    })
}

export const useGetSpecificAdminCinema = (cinemaId: string, options?:  Omit<UseQueryOptions<CinemaDetailResponse>, 'queryKey' | 'queryFn'>) => {
    return useQuery<CinemaDetailResponse>({
        ...options,
        queryKey: ["admin-cinema", cinemaId],
        queryFn: () => adminCinemaApi.getSpecificCinemaApi(cinemaId),
        refetchOnWindowFocus: false
    })
}
export const useAdminInsertCinema = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminCinemaApi.insertCinemaApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cinemas"]})
        }
    })
}

export const useAdminInsertMovieInCinema = (cinema_id: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminCinemaApi.insertMovieInCinemaApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cinema", cinema_id]})
        }
    })
}

export const useAdminUpdateCinema = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminCinemaApi.updateCinemaApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cinemas"]})
        }
    })
}

export const useAdminDeleteMovieInCinema = (cinema_id: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminCinemaApi.deleteMovieInCinemaApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin-cinema", cinema_id]})
        }
    })
}

export const useAdminDeleteCinema = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminCinemaApi.deleteCinemaApi,
        onMutate: async (deletedCinemaId) => {
            await queryClient.cancelQueries({ queryKey: ['admin-cinemas'] })
            const previousCinemas = queryClient.getQueryData(['admin-cinemas'])
            queryClient.setQueryData<CinemaResponse[]>(['admin-cinemas'], (old) => {
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