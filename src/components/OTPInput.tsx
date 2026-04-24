import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ErrorMessages } from "@/utils/error-messages";
import { useTimer, useForgotPassword } from "@/hooks";
import Footer from "./Footer"
import Header from "./Header"
import { toast } from 'react-toastify'

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
    const remainingTimes = useTimer.useSetTimer(60, otpResend)

    const navigate = useNavigate()
    const { mutate: resendOTP, isError: isResendOtpError, error: resendOtpError } = useForgotPassword.useForgotPassword()
    
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
            toast.success(data.message)
        }
        onMutate(otp, email!, onSuccess)
    }

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border border-red-600/20 mb-4">
                            <span className="text-2xl">🔐</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-white">
                            Enter OTP
                        </h1>
                        <p className="text-sm text-neutral-400 mt-2">
                            We've sent a verification code to <span className="text-white font-semibold">{email}</span>
                        </p>
                    </div>
                    {isError && (
                        <div className="mb-4 text-red-500">
                            <ErrorMessages error={error} />
                        </div>
                    )}
                    {isResendOtpError && (
                        <div className="mb-4 text-red-500">
                            <ErrorMessages error={resendOtpError} />
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label
                                htmlFor="otp"
                                className="block text-sm font-medium text-neutral-400 mb-2"
                            >
                                Verification Code
                            </label>
                            <input
                                type="text"
                                name="otp"
                                id="otp"
                                value={otp}
                                onChange={handleOTP}
                                inputMode="numeric"
                                maxLength={6}
                                placeholder="000000"
                                className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 text-center text-2xl font-bold text-white tracking-[0.5em] placeholder-neutral-600 focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                        >
                            Verify
                        </button>
                    </form>
                    <div className="mt-6 pt-4 border-t border-neutral-700 text-center">
                        <p className="text-sm text-neutral-400">
                            Didn't receive a code?{" "}
                            <button
                                disabled={otpResend}
                                onClick={handleResendOtp}
                                className="text-red-500 font-semibold hover:text-red-400 disabled:text-neutral-600 disabled:cursor-not-allowed transition-colors"
                            >
                                Resend
                            </button>
                        </p>
                        {otpResend && (
                            <p className="mt-2 text-sm text-neutral-500">
                                Check your email. Resend available in{" "}
                                <span className="text-red-500 font-bold">{remainingTimes}s</span>
                            </p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}