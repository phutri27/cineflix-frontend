import { getUsers, type UserResponse } from "@/api/admin/users/admin-user-api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useAdminGetUsers = (options?: Omit<UseQueryOptions<UserResponse[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["admin-users"],
        queryFn: getUsers
    })
}