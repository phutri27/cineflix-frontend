import { getUserId } from "@/api/user/user-api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useVerifyUser = (userId: string, options?: Omit<UseQueryOptions<{isLogin: boolean}>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["verifyUser", userId],
        queryFn: () => getUserId(userId),
        refetchOnWindowFocus: false
    })
}