import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logoutApi } from "@/api";
export const useLogout = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: logoutApi.logout,
        onSuccess: (data) => {
            if (data.logout){
                navigate("/")
            }
        }
    })
}