import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { userApi } from "@/api";

export const useVerifyUser = (userId: string, options?: Omit<UseQueryOptions<{isLogin: boolean}>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["verifyUser", userId],
        queryFn: () => userApi.getUserId(userId),
        refetchOnWindowFocus: false
    })
}