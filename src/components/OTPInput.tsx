import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ErrorMessages } from "@/utils/error-messages";

interface ResponseData {
    message: string
    resetToken:string
    userCred?: string
}
    

interface OTPInputProps {
    onMutate: (otp: string, email: string, onSuccess: (data: ResponseData) => void) => void
    email?: string;
    isError: boolean
    error: Error
    navigateURL: string

}
export default function OTPInput({onMutate, email, isError, error, navigateURL}: OTPInputProps) {
    const [otp, setOTP] = useState<string>('')
    
    const navigate = useNavigate()
    
    const handleOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOTP(e.target.value)
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        const onSuccess = (data: ResponseData) => {
            navigate(navigateURL, {state: data})
        }
        onMutate(otp, email!, onSuccess)
    }

    return (
        <div className="otp-container">
            <form onSubmit={handleSubmit}>
                {isError && <ErrorMessages  error={error} />}
                <label htmlFor="otp">
                    OTP 
                    <input 
                    type="number" 
                    name="otp" 
                    id="otp"
                    value={otp}
                    onChange={handleOTP}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}