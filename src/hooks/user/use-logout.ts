import { logout } from "@/api/user/logout-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
export const useLogout = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            if (data.logout){
                navigate("/")
            }
        }
    })
}