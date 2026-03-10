import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/api";

export const useSignup = () => {
    return useMutation({
        mutationFn: signUpUser,
    })
}