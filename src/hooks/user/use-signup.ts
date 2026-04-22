import { useMutation } from "@tanstack/react-query";
import { signupApi } from "@/api";

export const useSignup = () => {
    return useMutation({
        mutationFn: signupApi.signUpUser,
    })
}