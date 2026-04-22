import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { loginApi } from "@/api";
export const useLogin = () => {
    return useMutation({
        mutationFn: loginApi.loginUser
    });
};

export const useLoginGoogle = (options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["google"],
        queryFn: loginApi.loginGoogle,
        refetchOnWindowFocus: false
    })
}

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: ["login-session"],
        queryFn: loginApi.getUserInfo
    })
}