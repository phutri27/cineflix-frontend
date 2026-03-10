import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { loginUser } from "@/api";
import { loginGoogle } from "@/api";

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser
    });
};

export const useLoginGoolge = (options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ["google"],
        queryFn: loginGoogle,
    })
}