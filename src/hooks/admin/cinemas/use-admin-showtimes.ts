import * as showtimes from "@/api/admin/cinema/admin-showtime-api"
import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query"

export const useAdminGetShowtimes = (screenId: string, movieId: string, options?: Omit<UseQueryOptions<showtimes.Showtime[]>, 'queryKey' | 'queryFn'> ) => {
    return useQuery({
        ...options,
        queryKey: ["admin-showtimes", screenId, movieId],
        queryFn: () => showtimes.getShowtimesByScreenId(screenId, movieId)
    })
}

export const useAdminCreateShowtime = (cinemaId: string, movieId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: showtimes.createShowtimeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screen_specfic", cinemaId, movieId] });
        }
    })
}

export const useAdminUpdateShowtime = (cinemaId: string, movieId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: showtimes.updateShowtimeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screen_specfic", cinemaId, movieId] });
        }
    })
}

export const useAdminDeleteShowtime = (cinemaId: string, movieId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: showtimes.deleteShowtimeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screen_specfic", cinemaId, movieId] });
        }
    })
}   