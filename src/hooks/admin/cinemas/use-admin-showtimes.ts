import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query"
import { adminShowtimeApi } from "@/api"
import type { Showtime } from "@/types/admin/cinema/admin-showtime-type"

export const useAdminGetShowtimes = (screenId: string, movieId: string, options?: Omit<UseQueryOptions<Showtime[]>, 'queryKey' | 'queryFn'> ) => {
    return useQuery({
        ...options,
        queryKey: ["admin-showtimes", screenId, movieId],
        queryFn: () => adminShowtimeApi.getShowtimesByScreenId(screenId, movieId),
        refetchOnWindowFocus: false
    })
}

export const useAdminCreateShowtime = (cinemaId: string, movieId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: adminShowtimeApi.createShowtimeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screen_specfic", cinemaId, movieId] });
        }
    })
}

export const useAdminUpdateShowtime = (cinemaId: string, movieId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: adminShowtimeApi.updateShowtimeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screen_specfic", cinemaId, movieId] });
        }
    })
}

export const useAdminDeleteShowtime = (cinemaId: string, movieId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: adminShowtimeApi.deleteShowtimeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screen_specfic", cinemaId, movieId] });
        }
    })
}   