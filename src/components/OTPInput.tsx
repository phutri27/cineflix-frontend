import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ErrorMessages } from "@/utils/error-messages";
import { useSetTimer } from "@/hooks/user/use-set-timer";
import { useForgotPassword } from "@/hooks/user/use-forgot-password";

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
    const [otpResend, setOtpResend] = useState<boolean>(false)
    const remainingTimes = useSetTimer(60, otpResend)

    const navigate = useNavigate()
    const { mutate: resendOTP, isError: isResendOtpError, error: resendOtpError } = useForgotPassword()
    
    const handleOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOTP(e.target.value)
    }

    const handleResendOtp = () => {
        setOtpResend(true)
        resendOTP(email!)
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
                {isResendOtpError && <ErrorMessages error={resendOtpError}/>}
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
            <div>
                <p>Haven't got an OTP? <button disabled={otpResend} onClick={handleResendOtp}>Click here</button></p>
                {otpResend && <span>Please check your email, wait {remainingTimes}s for a resend</span>}
            </div>
        </div>
    )
}