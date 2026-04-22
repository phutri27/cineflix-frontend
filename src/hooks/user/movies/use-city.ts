import { useQuery } from "@tanstack/react-query";
import { cityApi } from "@/api";
export const useGetCities = () => {
    return useQuery({
        queryKey: ["cities"],
        queryFn: cityApi.getCity,
        refetchOnWindowFocus: false
    })
}