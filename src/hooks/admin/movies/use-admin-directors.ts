import { type DirectorResponse, adminGetDirectorsApi, adminInsertDirectorApi, adminDeleteActorApi} from "@/api";
import { useQuery, useMutation, type UseQueryOptions } from "@tanstack/react-query";

export const useGetDirectorsAdmin = (options?: Omit<UseQueryOptions<DirectorResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<DirectorResponse[]>({
        ...options,
        queryKey: ["admin_directors"],
        queryFn: adminGetDirectorsApi
    })
}

export const useInsertDirectorAdmin = () => {
    return useMutation({
        mutationFn: adminInsertDirectorApi
    })
}

export const useDeleteDirectorAdmin = () => {
    return useMutation({
        mutationFn: adminDeleteActorApi
    })
}

export const useUpdateDirectorAdmin = () => {
    return useMutation({
        mutationFn: adminInsertDirectorApi
    })
}