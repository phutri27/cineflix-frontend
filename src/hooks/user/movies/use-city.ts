import { useQuery } from "@tanstack/react-query";
import { getCity } from "@/api/user/city-api";

export const useGetCities = () => {
    return useQuery({
        queryKey: ["cities"],
        queryFn: getCity,
        refetchOnWindowFocus: false
    })
}