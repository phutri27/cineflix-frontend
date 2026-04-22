import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { UserResponse } from "@/types/admin/users/user-type";
import { adminUserApi } from "@/api";
export const useAdminGetUsers = (options?: Omit<UseQueryOptions<UserResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["admin-users"],
        queryFn: adminUserApi.getUsers,
        refetchOnWindowFocus: false
    })
}