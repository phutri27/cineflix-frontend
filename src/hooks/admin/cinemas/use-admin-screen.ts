import { adminScreenApi} from "@/api"
import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ScreensProp, ScreenByMovieAndCinemaResponse, ScreenTypeProp } from "@/types/admin/cinema/screen-type"

export function useGetAdminScreens(cinemaId: string, options?: Omit<UseQueryOptions<ScreensProp[]>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: ["admin_screens", cinemaId],
        queryFn: () => adminScreenApi.getAdminScreensByCinema(cinemaId),
        refetchOnWindowFocus: false,
        ...options
    })
}

export function useGetAdminScreenByMovie(cinema_id: string, movie_id: string,options?: Omit<UseQueryOptions<ScreenByMovieAndCinemaResponse[]>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: ["admin_screen_specfic", cinema_id, movie_id],
        queryFn: () => adminScreenApi.getAdminScreenByMovieAndCinema(cinema_id, movie_id),
        refetchOnWindowFocus: false,
        ...options
    })
}

export function useGetAdminSpecificScreen(screen_id: string, options?: Omit<UseQueryOptions<ScreenTypeProp>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: ["admin_screen", screen_id],
        queryFn: () => adminScreenApi.getAdminSeatByScreen(screen_id),
        refetchOnWindowFocus: false,
        ...options
    })
}

export function useInsertAdminScreen(cinemaId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminScreenApi.insertAdminScreen,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screens", cinemaId] })
        }
    })
}

export function useUpdateAdminScreen(cinemaId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminScreenApi.updateAdminScreen,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screens", cinemaId] })
        }
    })
}

export function useDeleteAdminScreen(cinemaId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: adminScreenApi.deleteAdminScreen,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screens", cinemaId] })
        }
    })
}