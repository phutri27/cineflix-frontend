import { useMutation } from "@tanstack/react-query";
import { OTPapi } from "@/api";

export const useOTP = () =>{
    return useMutation({
        mutationFn: OTPapi,
        
    })
}
