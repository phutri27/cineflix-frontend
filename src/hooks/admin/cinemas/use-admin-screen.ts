import * as screens from "@/api/admin/cinema/admin-screen-api"
import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetAdminScreens(cinemaId: string, options?: Omit<UseQueryOptions<screens.ScreensProp[]>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: ["admin_screens", cinemaId],
        queryFn: () => screens.getAdminScreensByCinema(cinemaId),
        refetchOnWindowFocus: false,
        ...options
    })
}

export function useGetAdminScreenByMovie(cinema_id: string, movie_id: string,options?: Omit<UseQueryOptions<screens.ScreenByMovieAndCinemaResponse[]>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: ["admin_screen_specfic", cinema_id, movie_id],
        queryFn: () => screens.getAdminScreenByMovieAndCinema(cinema_id, movie_id),
        refetchOnWindowFocus: false,
        ...options
    })
}

export function useGetAdminSpecificScreen(screen_id: string, options?: Omit<UseQueryOptions<screens.ScreenTypeProp>, "queryKey" | "queryFn">) {
    return useQuery({
        queryKey: ["admin_screen", screen_id],
        queryFn: () => screens.getAdminSeatByScreen(screen_id),
        refetchOnWindowFocus: false,
        ...options
    })
}

export function useInsertAdminScreen(cinemaId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: screens.insertAdminScreen,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screens", cinemaId] })
        }
    })
}

export function useUpdateAdminScreen(cinemaId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: screens.updateAdminScreen,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screens", cinemaId] })
        }
    })
}

export function useDeleteAdminScreen(cinemaId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: screens.deleteAdminScreen,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin_screens", cinemaId] })
        }
    })
}