import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { SnackProps } from "@/types/user/snacks-type";
import { snackApi } from "@/api";

export const useSnacks = (options?: Omit<UseQueryOptions<SnackProps[]>, "queryKey" | "queryFn">) => {
    return useQuery({
        queryKey: ["snacks"],
        queryFn: snackApi.getUserSnacks,
        refetchOnWindowFocus: false,
        ...options
    })
}