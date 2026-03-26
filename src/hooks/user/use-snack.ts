import { getSnacks, type SnackProps } from "@/api/user/snack-api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useSnacks = (options?: Omit<UseQueryOptions<SnackProps[]>, "queryKey" | "queryFn">) => {
    return useQuery({
        queryKey: ["snacks"],
        queryFn: getSnacks,
        refetchOnWindowFocus: false,
        ...options
    })
}