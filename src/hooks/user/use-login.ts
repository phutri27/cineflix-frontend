import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { loginUser, loginGoogle, getUserInfo } from "@/api";

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser
    });
};

export const useLoginGoogle = (options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["google"],
        queryFn: loginGoogle,
        refetchOnWindowFocus: false
    })
}

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: ["login-session"],
        queryFn: getUserInfo
    })
}